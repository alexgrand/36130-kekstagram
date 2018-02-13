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

(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENTS_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var WARNING_NO_HASH = 'Хэш-тег начинается с символа # (решётка)';
  var WARNING_NO_TEXT = 'Хэш-тег начинается с символа # (решётка) и состоит из одного слова';
  var WARNING_NO_SPACES = 'Хэш-теги разделяются пробелами';
  var WARNING_TOO_MUCH_HASHTAGS = 'Нельзя указать больше пяти хэш-тегов';
  var WARNING_LONG_HASHTAG = 'Максимальная длина одного хэш-тега 20 символов';
  var WARNING_REPEATING_HASHTAG = 'Один и тот же хэш-тег не может быть использован дважды';
  var WARNING_LONG_COMMENT = 'Длина комментария не может составлять больше 140 символов';

  var uploadHastagsElement = document.querySelector('.upload-form-hashtags');
  var uploadCommentElement = document.querySelector('.upload-form-description');

  var onUploadHashtagsInput = function (evt) {
    validateInput(evt);
  };
  var onUploadCommentInput = function (evt) {
    validateInput(evt);
  };

  var validateInput = function (evt) {
    var inputElement = evt.target;
    var inputValue = inputElement.value;
    var isHashtag = inputElement.classList.contains('upload-form-hashtags');
    var invalidMessage = getWarningMessage(inputValue, isHashtag);

    if (invalidMessage) {
      inputElement.setCustomValidity(invalidMessage);
    } else {
      inputElement.setCustomValidity('');
    }
  };
  var getWarningMessage = function (value, isHashtag) {
    var errorMessage = '';
    if (isHashtag) {
      var hashtags = value.split('#');
      hashtags[hashtags.length - 1] += ' ';
      if (hashtags.length > 0 && hashtags[0]) {
        errorMessage = WARNING_NO_HASH;
      }
      for (var i = 1; i < hashtags.length; i++) {
        var hashtagValue = hashtags[i];
        var hashtagValueLastIndex = hashtagValue.length - 1;
        var spaceIndex = hashtagValue.indexOf(' ');
        if (spaceIndex > 0 && spaceIndex < hashtagValueLastIndex) {
          errorMessage = WARNING_NO_HASH;
        } else if (!hashtagValue[hashtagValueLastIndex]) {
          errorMessage = WARNING_NO_TEXT;
        } else if (spaceIndex === 0) {
          errorMessage = WARNING_NO_TEXT;
        } else if (spaceIndex < hashtagValueLastIndex) {
          errorMessage = WARNING_NO_SPACES;
        } else if (hashtagValue.length > MAX_HASHTAG_LENGTH - 1) {
          errorMessage = WARNING_LONG_HASHTAG;
        } else if (hashtags.length > MAX_HASHTAGS + 1) {
          errorMessage = WARNING_TOO_MUCH_HASHTAGS;
        } else if (i > 0) {
          for (var j = 0; j < hashtags.length; j++) {
            if (i !== j && hashtagValue.toLowerCase() === hashtags[j].toLowerCase()) {
              errorMessage = WARNING_REPEATING_HASHTAG;
            }
          }
        }
      }
    } else {
      if (value.length > MAX_COMMENTS_LENGTH) {
        errorMessage = WARNING_LONG_COMMENT;
      }
    }
    return errorMessage;
  };

  var hashtagCommentsHandlers = [
    {element: uploadHastagsElement,
      eventType: 'input',
      handler: onUploadHashtagsInput
    },
    {element: uploadCommentElement,
      eventType: 'input',
      handler: onUploadCommentInput
    }
  ];

  window.validation = {
    addValidationHandlers: function () {
      uploadHastagsElement.value = '';
      uploadCommentElement.value = '';
      window.utils.runHandlers(hashtagCommentsHandlers, true);
    },
    removeValidationHandlers: function () {
      window.utils.runHandlers(hashtagCommentsHandlers, false);
    }
  };
})();

(function () {
  var uploadFileElement = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancelElement = uploadOverlay.querySelector('.upload-form-cancel');

  var openUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    window.effects.addEffectsHandlers();
    window.validation.addValidationHandlers();
    window.utils.runHandlers(openCloseUploadHandlers, true);
  };
  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    uploadFileElement.value = '';
    window.effects.removeEffectsHandlers();
    window.validation.removeValidationHandlers();
    window.utils.runHandlers(openCloseUploadHandlers, false);
  };

  var onUploadFileChange = function () {
    openUploadOverlay();
  };
  var onUploadFormEscPress = function (evt) {
    window.utils.onDocumentEscPress(evt, closeUploadOverlay);
  };
  var onUploadFormCancelClick = function () {
    closeUploadOverlay();
  };

  var uploadHandlers = [
    {element: uploadFileElement,
      eventType: 'change',
      handler: onUploadFileChange
    }
  ];
  var openCloseUploadHandlers = [
    {element: uploadFormCancelElement,
      eventType: 'click',
      handler: onUploadFormCancelClick
    },
    {element: document,
      eventType: 'keydown',
      handler: onUploadFormEscPress
    }
  ];

  window.utils.runHandlers(uploadHandlers, true);
})();

