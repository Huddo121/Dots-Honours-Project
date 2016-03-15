define(function (require) {

	'use strict';

	//var $ = require('jquery');
	//var requestAnimationFrame = require('requestAnimationFrame');
	var glm = require('gl-matrix');

	function DraggableBehaviour (element) {

		this.element = element;
		this.touches = {};
        this.touchCount = 0;
		this.moving = false;
		this.translation = glm.vec3.create();
		this.rotation = 0;
		this.scale = glm.vec3.fromValues(1, 1, 1);
		this.minScale = glm.vec3.fromValues(0.5, 0.5, 1);
		this.maxScale = glm.vec3.fromValues(5, 5, 1);
		this.updateRequested = false;
		this.onAnimationFrameCallback = this.onAnimationFrame.bind(this);

	}

	DraggableBehaviour.prototype.needsUpdate = function () {

		if (!this.updateRequested) {
			requestAnimationFrame(this.onAnimationFrameCallback);
			this.updateRequested = true;
		}

	};

	DraggableBehaviour.prototype.onMouseDown = function (element, event) {

		this.touches[-1] = {
			startPoint: glm.vec3.fromValues(event.pageX, event.pageY, 0),
			lastPoint: glm.vec3.fromValues(event.pageX, event.pageY, 0)
		};

	};

	DraggableBehaviour.prototype.onMouseMove = function (element, event) {

		var touchInfo = this.touches[-1];
		var touchPoint = glm.vec3.fromValues(event.pageX, event.pageY, 0);
		var translation = glm.vec3.sub(glm.vec3.create(), touchPoint, touchInfo.lastPoint);
		glm.vec3.add(this.translation, this.translation, translation);
		glm.vec3.copy(touchInfo.lastPoint, touchPoint);
		this.needsUpdate();

	};

	DraggableBehaviour.prototype.onMouseUp = function (element, event) {

		delete this.touches[-1];

	};

	DraggableBehaviour.prototype.onTouchStart = function (element, event) {

		var changedTouches = event.originalEvent.changedTouches;
        this.touchCount++;
		for (var i = 0, len = changedTouches.length; i < len; i++) {
			var touch = changedTouches[i];
			this.touches[touch.identifier] = {
				startPoint: glm.vec3.fromValues(touch.pageX, touch.pageY, 0),
				lastPoint: glm.vec3.fromValues(touch.pageX, touch.pageY, 0)
			};
		}

	};

	DraggableBehaviour.prototype.onTouchMove = function (element, event) {

		var targetTouches = event.originalEvent.targetTouches;
		var len = targetTouches.length;
		if (len >= 1) {
			var touch = targetTouches[0];
			var touchInfo = this.touches[touch.identifier];
			var touchPoint = glm.vec3.fromValues(touch.pageX, touch.pageY, 0);
			var translation = glm.vec3.sub(glm.vec3.create(), touchPoint, touchInfo.lastPoint);

			glm.vec3.add(this.translation, this.translation, translation);
			glm.vec3.copy(touchInfo.lastPoint, touchPoint);
		}
		this.needsUpdate();

	};

	DraggableBehaviour.prototype.onAnimationFrame = function () {

		this.updateRequested = false;
		this.updateTransform(this.element.element);

	};

	DraggableBehaviour.prototype.updateTransform = function (element) {

		element.css({
			transform: 'translate3d(' + this.translation[0] + 'px, ' + this.translation[1] + 'px, 0)'
					+ ' scale3d(' + this.scale[0] + ', ' + this.scale[1] + ', 1)'
					+ ' rotateZ(' + this.rotation + 'rad)'
		});

	};

	DraggableBehaviour.prototype.onTouchEnd = function (element, event) {

		var changedTouches = event.originalEvent.changedTouches;
        this.touchCount--;
		for (var i = 0, len = changedTouches.length; i < len; i++) {
			var touch = changedTouches[i];
			var touchId = touch.identifier;
			delete this.touches[touchId];
		}

	};

	return DraggableBehaviour;

});
