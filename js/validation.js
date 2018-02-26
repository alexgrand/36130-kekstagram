'use strict';
(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENTS_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var Warning = {
    NO_HASH: 'Хэш-тег начинается с символа # (решётка)',
    NO_TEXT: 'Хэш-тег начинается с символа # (решётка) и состоит из одного слова',
    NO_SPACES: 'Хэш-теги разделяются пробелами',
    TOO_MUCH_HASHTAGS: 'Нельзя указать больше пяти хэш-тегов',
    LONG_HASHTAG: 'Максимальная длина одного хэш-тега 20 символов',
    REPEATING_HASHTAG: 'Один и тот же хэш-тег не может быть использован дважды',
    LONG_COMMENT: 'Длина комментария не может составлять больше 140 символов'
  };

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
      inputElement.style.border = '2px solid red';
      inputElement.setCustomValidity(invalidMessage);
    } else {
      inputElement.style.border = '';
      inputElement.setCustomValidity('');
    }
  };
  var getWarningMessage = function (value, isHashtag) {
    var errorMessage = '';
    if (isHashtag) {
      var hashtags = value.split('#');
      if (hashtags.length > 0 && hashtags[0]) {
        errorMessage = Warning.NO_HASH;
      }
      hashtags[hashtags.length - 1] += ' ';
      for (var i = 1; i < hashtags.length; i++) {
        var hashtagValue = hashtags[i];
        var hashtagValueLastIndex = hashtagValue.length - 1;
        var spaceIndex = hashtagValue.indexOf(' ');
        if (spaceIndex > 0 && spaceIndex < hashtagValueLastIndex) {
          errorMessage = Warning.NO_HASH;
        } else if (!hashtagValue[hashtagValueLastIndex]) {
          errorMessage = Warning.NO_TEXT;
        } else if (spaceIndex === 0) {
          errorMessage = Warning.NO_TEXT;
        } else if (spaceIndex < hashtagValueLastIndex) {
          errorMessage = Warning.NO_SPACES;
        } else if (hashtagValue.length > MAX_HASHTAG_LENGTH - 1) {
          errorMessage = Warning.LONG_HASHTAG;
        } else if (hashtags.length > MAX_HASHTAGS + 1) {
          errorMessage = Warning.TOO_MUCH_HASHTAGS;
        } else if (i > 0) {
          for (var j = 0; j < hashtags.length; j++) {
            if (i !== j && hashtagValue.toLowerCase() === hashtags[j].toLowerCase()) {
              errorMessage = Warning.REPEATING_HASHTAG;
            }
          }
        }
      }
    } else {
      if (value.length > MAX_COMMENTS_LENGTH) {
        errorMessage = Warning.LONG_COMMENT;
      }
    }
    return errorMessage;
  };
  var refreshInput = function () {
    uploadHastagsElement.value = '';
    uploadCommentElement.value = '';
    uploadHastagsElement.setCustomValidity('');
    uploadCommentElement.setCustomValidity('');
    uploadHastagsElement.style.border = '';
    uploadCommentElement.style.border = '';
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
      refreshInput();
      window.utils.runHandlers(hashtagCommentsHandlers, true);
    },
    removeValidationHandlers: function () {
      window.utils.runHandlers(hashtagCommentsHandlers, false);
    }
  };
})();
