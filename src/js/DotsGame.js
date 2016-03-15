define(function (require) {
    'use strict';

    var $ = require('jquery');

    var Animate = require('./behaviour/Animate').getInstance();

    // Multitouch dependencies
    var glm = require('gl-matrix');
    var MultiTouchManager = require('behaviour/MultiTouchManager');
    var DraggableBehaviour = require('behaviour/DraggableBehaviour');
    var underscore = require('underscore');
    var jqueryUi = require('jquery-ui');
    var Two = require('two');

    var Levels = require('./levels/honours');
    var springBackOnMouseEvents = false;

    var controller = {

        elements: $(),
        multitouch: undefined,
        gameState: {
            level: 0,
            startTime: undefined
        },
        two: undefined,
        shadowTwo: undefined,
        timings: [],

        start: function() {
            this._initialise();
            this._renderLevel();
        },

        _initialise: function() {
            // Set up some initial game state
            this.gameState = {
                level: 0,
                startTime: undefined
            };

            // Set up the multitouch manager
            this.multitouch = MultiTouchManager.getInstance();

            // Set up the two.js library, which is used for drawing the connections between the Dots
            var twoOptions = {
                fullscreen: true,
                autostart: true
            };
            this.two = new Two(twoOptions);
            this.shadowTwo = new Two(twoOptions);
        },

        _renderLevel: function() {
            this._setupPlayArea();
            this._loadLevel();
            this._renderItems()
        },

        _setupPlayArea: function() {

            // Empty out everything that we can
            this.two.clear();
            this.shadowTwo.clear();
            $('#dotsLayer').empty();
            $('#linesLayer').empty();
            $('#shadowDotsLayer').empty();
            $('#shadowLinesLayer').empty();

            // Since we clear out all of the layers we need to add our line drawing library back to the page.
            this.two.appendTo($('#linesLayer')[0]);
            this.shadowTwo.appendTo($('#shadowLinesLayer')[0]);
        },

        _loadLevel: function() {
            // Load up the level data so that we can modify the state of it
            var currentLevel = Levels[this.gameState.level];
            this.gameState.dots = currentLevel.dots;
            this.gameState.shadowDots = currentLevel.shadows;
            this.gameState.connections = currentLevel.connections;
            this.gameState.accepts = currentLevel.accepts;
        },

        _renderItems: function () {

            function renderMovableDot(Dot) {
                return ('<button id="dots-' + Dot.id + '" class="btn btn-raised btn-material-' + Dot.colour + '-500 dots"></button>');
            }

            function renderShadowDot(ShadowDot) {
                return ('<button id="shadow-' + ShadowDot.id + '" class="btn btn-raised btn-material-' + ShadowDot.colour + '-200 dots"></button>');
            }

            // Render all of the Dots
            var self = this;
            this.gameState.dots.forEach(function(dot) {
                var element = $(renderMovableDot(dot));
                element.addClass("abs-center").appendTo($('#dotsLayer'));
                element.css('transform', [glm.vec3.fromValues(0, 0, 0), glm.vec3.fromValues(1, 1, 1), 0]);
                element.on("touchend", true, self.onTouchEnd.bind(self));
                element.on("mouseup", springBackOnMouseEvents, self.onTouchEnd.bind(self));
                // This is a bit of a dirty kludge to allow for me to check for the winning configuration when using the mouse
                element.on("mouseup", springBackOnMouseEvents, self.onTouchMove.bind(self));
                element.on("touchmove", true, self.onTouchMove.bind(self));
                var multiTouchElement = self.multitouch.addElement(element);
                var behaviour = new DraggableBehaviour(multiTouchElement);
                multiTouchElement.addBehaviour(behaviour);
                glm.vec3.copy(behaviour.translation, glm.vec3.fromValues(0, 0, 0));
                glm.vec3.copy(behaviour.scale, glm.vec3.fromValues(1, 1, 1));
                glm.vec3.copy(behaviour.rotation, 0);
                behaviour.needsUpdate();
                self.elements = self.elements.add(element);
            });

            // Set up the shadow dots
            this.gameState.shadowDots.forEach(function (shadowDot) {
                var element = $(renderShadowDot(shadowDot));
                element.addClass("abs-center").appendTo($('#shadowDotsLayer'));

                var shadowDotLocation = [shadowDot.x, shadowDot.y, 0];

                var coords = shadowDotLocation.map(function(ax) {
                    return ax + 'px';
                });

                Animate.move(element, {
                    css: {
                        transform: 'translate3d(' + coords.toString() + ')'
                    }
                });
            });

            this.gameState.connections.forEach(function(connection) {
                connection.line = self.two.makeLine(0, 0, 0, 0);
                connection.line.linewidth = 16;
                connection.line.stroke = "rgba(255, 150, 15, 1)";

                connection.shadowLine = self.shadowTwo.makeLine(0, 0, 0, 0);
                connection.shadowLine.linewidth = 16;
                connection.shadowLine.stroke = "rgba(255, 150, 15, 0.5)";
                var r1 = $('#shadow-' + connection.from)[0].getBoundingClientRect();
                var r2 = $('#shadow-' + connection.to)[0].getBoundingClientRect();
                connection.shadowLine.vertices[0].x = r1.left + (r1.width /2);
                connection.shadowLine.vertices[0].y = r1.top +  (r1.height/2);
                connection.shadowLine.vertices[1].x = r2.left + (r2.width /2);
                connection.shadowLine.vertices[1].y = r2.top +  (r2.height/2);
            });

            // Update the position of the lines endpoints
            self.two.bind("update", function(framecount) {
                self.gameState.connections.forEach(function (connection) {
                    var r1 = $('#dots-' + connection.from)[0].getBoundingClientRect();
                    var r2 = $('#dots-' + connection.to)[0].getBoundingClientRect();
                    connection.line.vertices[0].x = r1.left + (r1.width / 2);
                    connection.line.vertices[0].y = r1.top + (r1.height / 2);
                    connection.line.vertices[1].x = r2.left + (r2.width / 2);
                    connection.line.vertices[1].y = r2.top + (r2.height / 2);

                    var r3 = $('#shadow-' + connection.from)[0].getBoundingClientRect();
                    var r4 = $('#shadow-' + connection.to)[0].getBoundingClientRect();
                    connection.shadowLine.vertices[0].x = r3.left + (r3.width / 2);
                    connection.shadowLine.vertices[0].y = r3.top + (r3.height / 2);
                    connection.shadowLine.vertices[1].x = r4.left + (r4.width / 2);
                    connection.shadowLine.vertices[1].y = r4.top + (r4.height / 2);
                });
            });
        },


        onTouchEnd: function(event) {
            var element = $(event.target);
            var elements = this.multitouch.elements;
            var self = this;

            elements.filter(function(e) {
                 return e.element[0] === element[0];
            }).map(function(e) {
                return e.behaviours;
            }).map(function(behaviours) {
                behaviours.forEach(function(behaviour) {
                    if(behaviour.__proto__ === DraggableBehaviour.prototype
                        && behaviour.touchCount < 2
                        && event.data === true
                        && Levels[self.gameState.level].springBack === true) {
                        Animate.move(element, {
                            animate: {
                                easing: "linear",
                                duration: 120,
                                transform: 'translate3d(0, 0, 0)',
                                queue: false,
                                complete: function() {
                                    glm.vec3.copy(behaviour.translation, glm.vec3.fromValues(0, 0, 0));
                                }
                            }
                        });
                    }
                })
            });
        },

        onTouchMove: function(event) {
            // We only want to start timing the players once they have actually performed an action
            if(this.gameState.startTime === undefined) {
                this.gameState.startTime = new Date();
            }

            var element = $(event.target);
            var elements = this.multitouch.elements;
            var dot = this.gameState.dots.filter(function(dot) {
                return (dot.id === parseInt(element.attr("id").slice(-1)));
            }).map(function(e){return e})[0];
            var location = [0, 0, 0];

            // Quick sanity check in case the element has been removed before this event has been triggered
            //   which is usually the case when the level has just been successfully completed
            if(dot !== undefined) {

                // Get the multitouch element for the target dom element
                //   and then retrieve the location of that element
                elements.filter(function(e) {
                    return e.element[0] === element[0];
                }).map(function(e) {
                    return e.behaviours;
                }).map(function(behaviours) {
                    behaviours.forEach(function(behaviour) {
                        if(behaviour.__proto__ === DraggableBehaviour.prototype) {
                            location = behaviour.translation;
                        }
                    })
                });

                dot.x = location[0];
                dot.y = location[1];

                // See if the Dot is now over an acceptable Shadow Dot
                var self = this;
                this.gameState.shadowDots.forEach(function(shadowDot) {
                    if(self._withinBounds(dot, shadowDot) && shadowDot.colour == dot.colour) {
                        shadowDot.lastAccepted = dot.id;
                    }
                });

                var unfulfilledShadows = this.gameState.shadowDots.filter(function(shadowDot) {return shadowDot.lastAccepted === undefined});
                if(unfulfilledShadows.length === 0) {
                    if (this._inWinningConfiguration()) {
                        this._addTimingData();

                        //Remove the event listeners for the current dots
                        this.gameState.dots.forEach(function(dot) {
                            var dotElement = $('#dots-' + dot.id);
                            if(dotElement !== undefined) {
                                dotElement[0].removeEventListener("touchend", self.onTouchEnd, false);
                                dotElement[0].removeEventListener("mouseup", self.onTouchEnd, false);
                                dotElement[0].removeEventListener("touchmove", self.onTouchEnd, false);
                            }
                        });

                        this.gameState.level++;
                        this._renderLevel();
                    }
                }
            }


        },

        _updateShadowAcceptances: function() {
            var self = this;

            self.gameState.shadowDots.forEach(function(shadowDot) {
                shadowDot.lastAccepted = undefined;
                self.gameState.dots.forEach(function(dot) {
                    if (self._withinBounds(dot, shadowDot) && shadowDot.colour == dot.colour) {
                        shadowDot.lastAccepted = dot.id;
                    }
                });
            });
        },

        _withinBounds: function(dot, shadowDot) {
            //Check to see if both the X and Y coordinates of the Dot location are within 25px of the ShadowDot target
            return !!((dot.x < (shadowDot.x + 25) && dot.x > (shadowDot.x - 25)) && (dot.y < (shadowDot.y + 25) && dot.y > (shadowDot.y - 25)));
        },

        //Save the timing statistics for the level
        _addTimingData: function() {
            var endTime = new Date();
            this.timings.push({
                level: this.gameState.level,
                levelName: Levels[this.gameState.level].levelName,
                startTime: this.gameState.startTime,
                endTime: endTime,
                timeTaken: endTime.getTime() - this.gameState.startTime.getTime(),
                collaborating: Levels[this.gameState.level].springBack
            });
        },

        _inWinningConfiguration: function() {
            this._updateShadowAcceptances();
            var successfulConfiguration = false;

            var self = this;
            // If we have defined specific states that we will accept as a winning configuration of the game
            if(self.gameState.accepts instanceof Array) {
                successfulConfiguration = self.gameState.accepts.filter(function (configuration) {
                    var successfulPairings = configuration.filter(function (pair) {
                        var dot = self.gameState.dots.find(function (dot) {
                            return dot.id === pair.dot
                        });
                        var shadow = self.gameState.shadowDots.find(function (shadow) {
                            return shadow.id === pair.shadow
                        });

                        if (self._withinBounds(dot, shadow)) {
                            return true;
                        }
                    });
                    return successfulPairings.length === self.gameState.dots.length;
                });
            } else {
                // If we have used one of the string shorthands
                if(self.gameState.accepts === 'allColourAllConnections') {
                    var fulfilledShadows = self.gameState.shadowDots.filter(function(shadow) {
                        // allColourAllConnections is a shorthand for levels that will be considered complete if all the
                        //   Shadow Dots are accepting a Dot of the correct colour and the number of connections are
                        //   equal.
                        var acceptedDot = self.gameState.dots.find(function(dot) {
                            return dot.id == shadow.lastAccepted;
                        });
                        var numDotConnections = self.gameState.connections.filter(function(connection) {
                            return connection.from === acceptedDot.id || connection.to === acceptedDot.id;
                        }).length;
                        var numShadowConnections = self.gameState.connections.filter(function(connection) {
                            return connection.from === shadow.id || connection.to === shadow.id;
                        }).length;

                        return shadow.lastAccepted !== undefined && numDotConnections === numShadowConnections;
                    });

                    return !!fulfilledShadows && fulfilledShadows.length === this.gameState.shadowDots.length;
                } else if(this.gameState.accepts === 'idMatch') {
                    // For levels with only one solution
                    var fulfilledShadows = this.gameState.shadowDots.filter(function(shadow) {
                        return shadow.id === shadow.lastAccepted;
                    });
                    return !!fulfilledShadows && fulfilledShadows.length === this.gameState.shadowDots.length;
                }
            }

            return successfulConfiguration && successfulConfiguration.length > 0;
        }
    };

    return controller;
});
