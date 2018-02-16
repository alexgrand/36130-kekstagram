'use strict';
(function () {
  var effectsContainerElement = document.querySelector('.upload-effect__container');
  var effectControlsElement = effectsContainerElement.querySelector('.upload-effect-controls');
  var effectLevelElement = effectControlsElement.querySelector('.upload-effect-level');
  var effectLevelPinElement = effectControlsElement.querySelector('.upload-effect-level-pin');
  var effectLevelLineElement = effectControlsElement.querySelector('.upload-effect-level-line');
  var effectLevelValueElement = effectControlsElement.querySelector('.upload-effect-level-value');
  var effectImagePreviewElement = effectsContainerElement.querySelector('.effect-image-preview');
  var effectValElement = effectsContainerElement.querySelector('.upload-effect-level-val');

  var effects = [
    {name: 'chrome', filter: 'grayscale', value: 1, scale: false},
    {name: 'sepia', filter: 'sepia', value: 1, scale: false},
    {name: 'marvin', filter: 'invert', value: 100, scale: '%'},
    {name: 'phobos', filter: 'blur', value: 3, scale: 'px'},
    {name: 'heat', filter: 'brightness', value: 3, scale: false}
  ];
  var usedEffect = '';

  var onEffectLevelPinMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onEffectLevelPinMouseMove = function (moveEvt) {
      var pinPosition = getElementPosition(effectLevelPinElement);
      var linePosition = getElementPosition(effectLevelLineElement);

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };
      if ((pinPosition.middleX - shift.x) >= linePosition.left && (pinPosition.middleX - shift.x) <= linePosition.right) {
        effectLevelPinElement.style.left = Math.floor((effectLevelPinElement.offsetLeft - shift.x)) + 'px';
        calculateSaturationLevel();
        effectValElement.style.width = effectLevelValueElement.value + '%';
      }
    };

    var onEffectLevelPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      calculateSaturationLevel();
      document.removeEventListener('mousemove', onEffectLevelPinMouseMove);
      document.removeEventListener('mouseup', onEffectLevelPinMouseUp);
    };

    document.addEventListener('mousemove', onEffectLevelPinMouseMove);
    document.addEventListener('mouseup', onEffectLevelPinMouseUp);
  };
  var onEffectControlsChange = function (evt) {
    refreshEffectValues();
    var effectElement = evt.target;

    if (effectElement.value !== 'none') {
      effectLevelElement.classList.remove('hidden');
      effectImagePreviewElement.classList.add('effect-' + effectElement.value);
      usedEffect = effectElement.value;
    } else {
      effectLevelElement.classList.add('hidden');
    }
  };

  var refreshEffectValues = function () {
    effectImagePreviewElement.setAttribute('class', '');
    effectImagePreviewElement.setAttribute('class', 'effect-image-preview ');
    effectLevelValueElement.value = 100;
    effectLevelPinElement.style.left = effectLevelValueElement.value + '%';
    effectValElement.style.width = effectLevelPinElement.style.left;
    usedEffect = '';
    effectImagePreviewElement.style.filter = '';
  };
  var getElementPosition = function (element) {
    var position = element.getBoundingClientRect();
    return {
      left: Math.floor(position.left),
      right: Math.floor(position.right),
      top: Math.floor(position.top),
      bottom: Math.floor(position.bottom),
      width: Math.floor(position.right - position.left),
      height: Math.floor(position.bottom - position.top),
      middleX: Math.floor(position.left + (position.right - position.left) / 2),
      middleY: Math.floor(position.top + (position.bottom - position.top) / 2)
    };
  };
  var calculateSaturationLevel = function () {
    var pinElement = effectLevelPinElement;
    var linePosition = getElementPosition(effectLevelLineElement);
    var pinPosition = getElementPosition(pinElement);
    var levelPinValue = (pinPosition.middleX - linePosition.left) * 100 / linePosition.width;
    effectLevelValueElement.value = Math.floor(levelPinValue);
    changeSaturationLevel();
  };
  var changeSaturationLevel = function () {
    var saturationValue = effectLevelValueElement.value;
    var effect = '';
    for (var i = 0; i < effects.length; i++) {
      if (effects[i].name === usedEffect) {
        saturationValue = saturationValue * effects[i].value / 100;
        if (effects[i].scale) {
          effect = effects[i].filter + '(' + saturationValue + effects[i].scale + ')';
        } else {
          effect = effects[i].filter + '(' + saturationValue + ')';
        }
      }
    }
    effectImagePreviewElement.style.filter = effect;
  };

  var effectsHandlers = [
    {element: effectControlsElement,
      eventType: 'change',
      handler: onEffectControlsChange
    },
    {element: effectLevelPinElement,
      eventType: 'mousedown',
      handler: onEffectLevelPinMousedown
    },
  ];
  window.effects = {
    addEffectsHandlers: function () {
      effectLevelElement.classList.add('hidden');
      refreshEffectValues();
      window.utils.runHandlers(effectsHandlers, true);
    },
    removeEffectsHandlers: function () {
      window.utils.addRemoveListeners(effectControlsElement, 'change', onEffectLevelPinMousedown, false);
    }
  };
})();
