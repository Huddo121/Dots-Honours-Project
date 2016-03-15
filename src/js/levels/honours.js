define(function(require) {
    var levels = [
        {
            levelName: 'First Steps',
            springBack: true,
            dots: [
                {id: 1, colour: "blue"},
                {id: 2, colour: "blue"}
            ],
            shadows: [
                {id: 1, x:  200, y: -100, colour: "blue"},
                {id: 2, x: -200, y:  100, colour: "blue"}
            ],
            connections: [],
            accepts: [
                [{dot: 1, shadow: 1}, {dot: 2, shadow: 2}],
                [{dot: 1, shadow: 2}, {dot: 2, shadow: 1}]
            ]
        },
        {
            levelName: 'Learn to share',
            springBack: true,
            dots: [
                {id: 1, colour: 'green'},
                {id: 2, colour: 'green'},
                {id: 3, colour: 'green'},
                {id: 4, colour: 'green'}
            ],
            shadows: [
                {id: 1, x: -400, y:  300, colour: 'green'},
                {id: 2, x: -400, y: -300, colour: 'green'},
                {id: 3, x:  400, y:  300, colour: 'green'},
                {id: 4, x:  400, y: -300, colour: 'green'}
            ],
            connections: [],
            accepts: 'allColourAllConnections'
        },
        {
            levelName: 'Line \'em up',
            springBack: true,
            dots: [
                {id: 1, colour: 'orange'},
                {id: 2, colour: 'orange'},
                {id: 3, colour: 'orange'},
                {id: 4, colour: 'orange'}
            ],
            shadows: [
                {id:1, x: -300, y:  300, colour:'orange'},
                {id:2, x: -300, y: -300, colour:'orange'},
                {id:3, x:  300, y:  300, colour:'orange'},
                {id:4, x:  300, y: -300, colour:'orange'}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 1, to: 3},
                {from: 1, to: 4}
            ],
            accepts: 'allColourAllConnections'
        },
        {
            levelName: 'The Valley',
            springBack: true,
            dots: [
                {id: 1, colour: "blue"},
                {id: 2, colour: "purple"},
                {id: 3, colour: "orange"}
            ],
            shadows: [
                {id: 1, x:  300, y: -300, colour: "blue"},
                {id: 2, x:    0, y:  300, colour: "purple"},
                {id: 3, x: -300, y: -300, colour: "orange"}
            ],
            connections: [],
            accepts: 'idMatch'
        },
        {
            levelName: 'Boxxy',
            springBack: true,
            dots: [
                {id: 1, colour: 'red'},
                {id: 2, colour: 'red'},
                {id: 3, colour: 'purple'},
                {id: 4, colour: 'purple'}
            ],
            shadows: [
                {id: 1, x: -400, y:  300, colour: 'red'},
                {id: 2, x: -400, y: -300, colour: 'red'},
                {id: 3, x:  400, y:  300, colour: 'purple'},
                {id: 4, x:  400, y: -300, colour: 'purple'}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 2, to: 3},
                {from: 2, to: 4},
                {from: 4, to: 3}
            ],
            accepts: 'allColourAllConnections'
        },
        {
            levelName: 'A cross the universe',
            springBack: true,
            dots: [
                {id: 1, colour: "blue"},
                {id: 2, colour: "blue"},
                {id: 3, colour: "blue"},
                {id: 4, colour: "blue"}
            ],
            shadows: [
                {id: 1, x:  -50, y: -300, colour: "blue"},
                {id: 2, x:   50, y:  300, colour: "blue"},
                {id: 3, x: -200, y:  -50, colour: "blue"},
                {id: 4, x:  200, y:   50, colour: "blue"}
            ],
            connections: [
                {from: 1, to:2},
                {from: 3, to:4}
            ],
            accepts: [
                [{dot: 1, shadow: 1}, {dot: 2, shadow: 2}, {dot: 3, shadow: 3}, {dot: 4, shadow: 4}],
                [{dot: 1, shadow: 1}, {dot: 2, shadow: 2}, {dot: 3, shadow: 4}, {dot: 4, shadow: 3}],
                [{dot: 1, shadow: 2}, {dot: 2, shadow: 1}, {dot: 3, shadow: 3}, {dot: 4, shadow: 4}],
                [{dot: 1, shadow: 2}, {dot: 2, shadow: 1}, {dot: 3, shadow: 4}, {dot: 4, shadow: 3}],
                [{dot: 1, shadow: 3}, {dot: 2, shadow: 4}, {dot: 3, shadow: 1}, {dot: 4, shadow: 2}],
                [{dot: 1, shadow: 3}, {dot: 2, shadow: 4}, {dot: 3, shadow: 2}, {dot: 4, shadow: 1}],
                [{dot: 1, shadow: 4}, {dot: 2, shadow: 3}, {dot: 3, shadow: 1}, {dot: 4, shadow: 2}],
                [{dot: 1, shadow: 4}, {dot: 2, shadow: 3}, {dot: 3, shadow: 2}, {dot: 4, shadow: 1}]
            ]
        },
        {
            levelName: 'Star',
            springBack: true,
            dots: [
                {id: 1, colour: "green"},
                {id: 2, colour: "purple"},
                {id: 3, colour: "purple"},
                {id: 4, colour: "purple"},
                {id: 5, colour: "purple"}
            ],
            shadows: [
                {id: 1, x:  200, y:  260, colour: "green"},
                {id: 2, x: -200, y:  260, colour: "purple"},
                {id: 3, x: -260, y: -120, colour: "purple"},
                {id: 4, x:    0, y: -330, colour: "purple"},
                {id: 5, x:  260, y: -120, colour: "purple"}
            ],
            connections: [
                {from: 1, to: 3},
                {from: 3, to: 5},
                {from: 5, to: 2},
                {from: 2, to: 4},
                {from: 4, to: 1}
            ],
            accepts: [
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:5}],
                [{dot:1, shadow:1},{dot:2, shadow:5},{dot:3, shadow:4},{dot:4, shadow:3},{dot:5, shadow:2}]
            ]
        },
        {
            levelName: 'Scaffold',
            springBack: true,
            dots: [
                {id: 1, colour: "green"},
                {id: 2, colour: "purple"},
                {id: 3, colour: "green"},
                {id: 4, colour: "blue"},
                {id: 5, colour: "blue"}
            ],
            shadows: [
                {id: 1, x: -400, y: -200, colour: "green"},
                {id: 2, x:    0, y: -200, colour: "purple"},
                {id: 3, x:  400, y: -200, colour: "green"},
                {id: 4, x: -400, y:  200, colour: "blue"},
                {id: 5, x:    0, y:  200, colour: "blue"}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 2, to: 3},
                {from: 2, to: 4},
                {from: 2, to: 5},
                {from: 3, to: 5},
                {from: 4, to: 5}
            ],
            accepts: 'idMatch'
        },
        {
            levelName: "Spliterator",
            springBack: true,
            dots: [
                {id: 1, colour: "purple"},
                {id: 2, colour: "purple"},
                {id: 3, colour: "cyan"},
                {id: 4, colour: "cyan"},
                {id: 5, colour: "red"},
                {id: 6, colour: "orange"}
            ],
            shadows: [
                {id: 1, x: -100, y:  200, colour: "purple"},
                {id: 2, x:  100, y: -100, colour: "purple"},
                {id: 3, x: -300, y: -100, colour: "cyan"},
                {id: 4, x:  300, y: -100, colour: "cyan"},
                {id: 5, x:  100, y:  200, colour: "red"},
                {id: 6, x: -100, y: -100, colour: "orange"}
            ],
            connections: [
                {from: 1, to: 6},
                {from: 6, to: 3},
                {from: 3, to: 1},
                {from: 2, to: 4},
                {from: 4, to: 5},
                {from: 5, to: 2}
            ],
            accepts: 'idMatch'
        },
        {
            levelName: 'Prismatic',
            springBack: true,
            dots: [
                {id: 1, colour: "orange"},
                {id: 2, colour: "purple"},
                {id: 3, colour: "purple"},
                {id: 4, colour: "orange"},
                {id: 5, colour: "green"},
                {id: 6, colour: "green"}
            ],
            shadows: [
                {id: 1, x: -300, y: -200, colour: "orange"},
                {id: 2, x:  300, y: -200, colour: "purple"},
                {id: 3, x: -200, y:   50, colour: "purple"},
                {id: 4, x:  400, y:   50, colour: "orange"},
                {id: 5, x: -400, y:  200, colour: "green"},
                {id: 6, x:  200, y:  200, colour: "green"}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 3, to: 4},
                {from: 5, to: 6},
                {from: 1, to: 3},
                {from: 1, to: 5},
                {from: 2, to: 4},
                {from: 2, to: 6},
                {from: 3, to: 5},
                {from: 4, to: 6}
            ],
            accepts: [
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:5},{dot:6, shadow:6}],
                [{dot:1, shadow:4},{dot:2, shadow:3},{dot:3, shadow:2},{dot:4, shadow:1},{dot:5, shadow:6},{dot:6, shadow:5}]
            ]
        },
        {
            levelName: 'Helix',
            springBack: true,
            dots: [
                {id: 1, colour: "purple"},
                {id: 2, colour: "purple"},
                {id: 3, colour: "purple"},
                {id: 4, colour: "orange"},
                {id: 5, colour: "orange"},
                {id: 6, colour: "orange"}
            ],
            shadows: [
                {id: 1, x: -200, y: -250, colour: "purple"},
                {id: 2, x: -200, y:    0, colour: "purple"},
                {id: 3, x: -200, y:  250, colour: "purple"},
                {id: 4, x:  200, y: -250, colour: "orange"},
                {id: 5, x:  200, y:    0, colour: "orange"},
                {id: 6, x:  200, y:  250, colour: "orange"}
            ],
            connections: [
                {from: 1, to: 4},
                {from: 1, to: 5},
                {from: 2, to: 4},
                {from: 2, to: 5},
                {from: 2, to: 6},
                {from: 3, to: 5},
                {from: 3, to: 6}
            ],
            accepts: [
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:5},{dot:6, shadow:6}],
                [{dot:1, shadow:3},{dot:2, shadow:2},{dot:3, shadow:1},{dot:4, shadow:6},{dot:5, shadow:5},{dot:6, shadow:4}]
            ]
        },
        {
            levelName: 'Cat\'s in the cradle',
            springBack: true,
            dots: [
                {id: 1, colour: "yellow"},
                {id: 2, colour: "yellow"},
                {id: 3, colour: "blue"},
                {id: 4, colour: "blue"},
                {id: 5, colour: "purple"},
                {id: 6, colour: "purple"}
            ],
            shadows: [
                {id: 1, x: -250, y: -350, colour: "yellow"},
                {id: 2, x:  250, y:  350, colour: "yellow"},
                {id: 3, x: -300, y:    0, colour: "blue"},
                {id: 4, x:  300, y:    0, colour: "blue"},
                {id: 5, x: -300, y:  350, colour: "purple"},
                {id: 6, x:  300, y: -350, colour: "purple"}
            ],
            connections: [
                {from: 1, to: 6},
                {from: 1, to: 4},
                {from: 1, to: 2},
                {from: 6, to: 4},
                {from: 6, to: 5},
                {from: 3, to: 4},
                {from: 3, to: 5},
                {from: 5, to: 2}
            ],
            accepts: 'idMatch'
        },
        {
            levelName: 'Pom pom',
            springBack: true,
            dots: [
                {id: 1, colour: "red"},
                {id: 2, colour: "red"},
                {id: 3, colour: "red"},
                {id: 4, colour: "red"}
            ],
            shadows: [
                {id: 1, x: -400, y:  300, colour: "red"},
                {id: 2, x:    0, y:  300, colour: "red"},
                {id: 3, x:  400, y:  300, colour: "red"},
                {id: 4, x:    0, y: -300, colour: "red"}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 1, to: 4},
                {from: 2, to: 4},
                {from: 4, to: 3}
            ],
            accepts: [
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4}],
                [{dot:1, shadow:2},{dot:2, shadow:1},{dot:3, shadow:3},{dot:4, shadow:4}]
            ]
        },
        {
            levelName: 'Learn you a dot',
            springBack: true,
            dots: [
                {id: 1, colour: "green"},
                {id: 2, colour: "orange"},
                {id: 3, colour: "orange"},
                {id: 4, colour: "green"},
                {id: 5, colour: "orange"}
            ],
            shadows: [
                {id: 1, x:  200, y:  260, colour: "green"},
                {id: 2, x: -200, y:  260, colour: "orange"},
                {id: 3, x: -260, y: -120, colour: "orange"},
                {id: 4, x:    0, y: -330, colour: "green"},
                {id: 5, x:  260, y: -120, colour: "orange"}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 2, to: 3},
                {from: 3, to: 4},
                {from: 4, to: 5},
                {from: 5, to: 1}
            ],
            accepts: [
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:5}],
                [{dot:1, shadow:4},{dot:2, shadow:3},{dot:3, shadow:2},{dot:4, shadow:1},{dot:5, shadow:5}]
            ]
        },
        {
            levelName: 'Dial M for Multitouch',
            springBack: true,
            dots: [
                {id: 1, colour: "indigo"},
                {id: 2, colour: "indigo"},
                {id: 3, colour: "indigo"},
                {id: 4, colour: "orange"},
                {id: 5, colour: "orange"}
            ],
            shadows: [
                {id: 1, x: -250, y:  200, colour: "indigo"},
                {id: 2, x: -250, y: -200, colour: "indigo"},
                {id: 3, x:  250, y: -200, colour: "indigo"},
                {id: 4, x:    0, y:  200, colour: "orange"},
                {id: 5, x:  250, y:  200, colour: "orange"}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 2, to: 4},
                {from: 4, to: 3},
                {from: 3, to: 5}
            ],
            accepts: 'idMatch'
        },
        {
            levelName: 'Yarn',
            springBack: true,
            dots: [
                {id: 1, colour: "orange"},
                {id: 2, colour: "orange"},
                {id: 3, colour: "orange"},
                {id: 4, colour: "blue"},
                {id: 5, colour: "blue"},
                {id: 6, colour: "blue"}
            ],
            shadows: [
                {id: 1, x: -250, y: -200, colour: "orange"},
                {id: 2, x:    0, y: -200, colour: "orange"},
                {id: 3, x:  250, y: -200, colour: "orange"},
                {id: 4, x: -250, y:  200, colour: "blue"},
                {id: 5, x:    0, y:  200, colour: "blue"},
                {id: 6, x:  250, y:  200, colour: "blue"}
            ],
            connections: [
                {from: 1, to: 4},
                {from: 1, to: 5},
                {from: 2, to: 4},
                {from: 2, to: 5},
                {from: 2, to: 6},
                {from: 3, to: 5},
                {from: 3, to: 6}
            ],
            accepts: [
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:5},{dot:6, shadow:6}],
                [{dot:1, shadow:3},{dot:2, shadow:2},{dot:3, shadow:1},{dot:4, shadow:6},{dot:5, shadow:5},{dot:6, shadow:4}]
            ]
        },
        {
            levelName: 'Pyramid',
            springBack: true,
            dots: [
                {id: 1, colour: "teal"},
                {id: 2, colour: "teal"},
                {id: 3, colour: "teal"},
                {id: 4, colour: "teal"},
                {id: 5, colour: "teal"}
            ],
            shadows: [
                {id: 1, x:    0, y: -300, colour: "teal"},
                {id: 2, x: -200, y:   50, colour: "teal"},
                {id: 3, x:  200, y:    0, colour: "teal"},
                {id: 4, x: -175, y:  250, colour: "teal"},
                {id: 5, x:  225, y:  200, colour: "teal"}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 1, to: 3},
                {from: 1, to: 4},
                {from: 1, to: 5},
                {from: 2, to: 4},
                {from: 3, to: 5},
                {from: 4, to: 5},
                {from: 3, to: 2}
            ],
            accepts: [
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:5}],
                [{dot:1, shadow:1},{dot:2, shadow:3},{dot:3, shadow:5},{dot:4, shadow:2},{dot:5, shadow:4}],
                [{dot:1, shadow:1},{dot:2, shadow:5},{dot:3, shadow:4},{dot:4, shadow:3},{dot:5, shadow:2}],
                [{dot:1, shadow:1},{dot:2, shadow:4},{dot:3, shadow:2},{dot:4, shadow:5},{dot:5, shadow:3}],
                [{dot:1, shadow:1},{dot:2, shadow:3},{dot:3, shadow:2},{dot:4, shadow:5},{dot:5, shadow:4}],
                [{dot:1, shadow:1},{dot:2, shadow:4},{dot:3, shadow:5},{dot:4, shadow:2},{dot:5, shadow:3}],
                [{dot:1, shadow:1},{dot:2, shadow:5},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:2}],
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:4},{dot:4, shadow:3},{dot:5, shadow:5}]
            ]
        },
        {
            levelName: 'Neigh neigh',
            springBack: true,
            dots: [
                {id: 1, colour: "blue"},
                {id: 2, colour: "blue"},
                {id: 3, colour: "blue"},
                {id: 4, colour: "blue"},
                {id: 5, colour: "blue"},
                {id: 6, colour: "blue"},
                {id: 7, colour: "blue"}
            ],
            shadows: [
                {id: 1, x: -475, y: -225, colour: "blue"},
                {id: 2, x: -375, y: -350, colour: "blue"},
                {id: 3, x: -100, y:  -50, colour: "blue"},
                {id: 4, x: -175, y:  150, colour: "blue"},
                {id: 5, x:  100, y:  -50, colour: "blue"},
                {id: 6, x:  125, y:  175, colour: "blue"},
                {id: 7, x:  325, y: -100, colour: "blue"}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 2, to: 3},
                {from: 3, to: 4},
                {from: 3, to: 5},
                {from: 5, to: 6},
                {from: 5, to: 7}
            ],
            accepts: [
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:5},{dot:6, shadow:6},{dot:7, shadow:7}],
                [{dot:1, shadow:1},{dot:2, shadow:2},{dot:3, shadow:3},{dot:4, shadow:4},{dot:5, shadow:5},{dot:6, shadow:7},{dot:7, shadow:6}]
            ]
        },
        {
            levelName: 'Orion',
            springBack: true,
            dots: [
                {id: 1, colour: "orange"},
                {id: 2, colour: "orange"},
                {id: 3, colour: "orange"},
                {id: 4, colour: "purple"},
                {id: 5, colour: "green"},
                {id: 6, colour: "green"},
                {id: 7, colour: "purple"}
            ],
            shadows: [
                {id: 1, x:    0, y: -375, colour: "orange"},
                {id: 2, x: -200, y: -300, colour: "orange"},
                {id: 3, x:  200, y: -280, colour: "orange"},
                {id: 4, x: -150, y:   50, colour: "purple"},
                {id: 5, x:  100, y:   50, colour: "green"},
                {id: 6, x: -150, y:  200, colour: "green"},
                {id: 7, x:  150, y:  200, colour: "purple"}
            ],
            connections: [
                {from: 1, to: 2},
                {from: 2, to: 3},
                {from: 3, to: 1},
                {from: 2, to: 4},
                {from: 3, to: 5},
                {from: 4, to: 5},
                {from: 4, to: 6},
                {from: 5, to: 7},
                {from: 6, to: 7}
            ],
            accepts: 'idMatch'
        }
    ];

    return levels;
});
