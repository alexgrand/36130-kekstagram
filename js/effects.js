'use strict';
(function () {
  var effectsContainerElement = document.querySelector('.upload-effect__container');
  var effectControlsElement = effectsContainerElement.querySelector('.upload-effect-controls');
  var effectLevelElement = effectControlsElement.querySelector('.upload-effect-level');
  var effectLevelPinElement = effectControlsElement.querySelector('.upload-effect-level-pin');
  var effectLevelLineElement = effectControlsElement.querySelector('.upload-effect-level-line');
  var effectLevelValueElement = effectControlsElement.querySelector('.upload-effect-level-value');
  var effectImagePreviewElement = effectsContainerElement.querySelector('.effect-image-preview');

  var effects = [
    {name: 'chrome', filter: 'grayscale', value: 1, scale: false},
    {name: 'sepia', filter: 'sepia', value: 1, scale: false},
    {name: 'marvin', filter: 'invert', value: 100, scale: '%'},
    {name: 'phobos', filter: 'blur', value: 3, scale: 'px'},
    {name: 'heat', filter: 'brightness', value: 3, scale: false}
  ];
  var usedEffect = '';

  var onEffectLevelPinMouseup = function (evt) {
    calculateSaturationLevel(evt.target);
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
    usedEffect = '';
    effectImagePreviewElement.style.filter = '';
  };
  var calculateSaturationLevel = function (element) {
    var levelLinePosition = effectLevelLineElement.getBoundingClientRect();
    var levelLineWidth = levelLinePosition.width;
    var levelLineX = Math.floor(levelLinePosition.x);

    var levelPinPosition = element.getBoundingClientRect();
    var levelPinWidth = levelPinPosition.width;
    var levelPinX = Math.floor(levelPinPosition.x);
    var levelPinValue = ((levelPinX + levelPinWidth / 2) - levelLineX) * 100 / levelLineWidth;

    effectLevelValueElement.value = levelPinValue;
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
      eventType: 'mouseup',
      handler: onEffectLevelPinMouseup
    },
  ];
  window.effects = {
    addEffectsHandlers: function () {
      effectLevelElement.classList.add('hidden');
      refreshEffectValues();
      window.utils.runHandlers(effectsHandlers, true);
    },
    removeEffectsHandlers: function () {
      window.utils.runHandlers(effectsHandlers, false);
    }
  };
})();
