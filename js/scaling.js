'use strict';

(function () {
  var SCALE_STEP = 25;
  var MAXIMUM_SCALE = 100;
  var MINIMUM_SCALE = 25;
  var buttons = ['upload-resize-controls-button-dec', 'upload-resize-controls-button-inc'];
  var scale = MAXIMUM_SCALE;

  var resizeControlsElement = document.querySelector('.upload-resize-controls');
  var resizeValueElement = resizeControlsElement.querySelector('.upload-resize-controls-value');
  var effectImageElement = document.querySelector('.effect-image-preview');

  resizeValueElement.value = scale + '%';

  var onResizeControlsClick = function (evt) {
    var element = evt.target;
    var buttonName = element.classList;
    scale = +resizeValueElement.value.slice(0, resizeValueElement.value.length - 1);
    if (scale > MINIMUM_SCALE && buttonName.contains(buttons[0])) {
      scale -= SCALE_STEP;
    } else if (scale < MAXIMUM_SCALE && buttonName.contains(buttons[1])) {
      scale += SCALE_STEP;
    }
    effectImageElement.style.transform = 'scale(' + scale / 100 + ')';
    resizeValueElement.value = scale + '%';
  };

  var scalingHandlers = [
    {element: resizeControlsElement,
      eventType: 'click',
      handler: onResizeControlsClick
    }
  ];

  window.scaling = {
    addScalingHandlers: function () {
      window.utils.runHandlers(scalingHandlers, true);
    },
    removeScalingHandlers: function () {
      window.utils.runHandlers(scalingHandlers, false);
    }
  };
})();
