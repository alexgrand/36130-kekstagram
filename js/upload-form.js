'use strict';
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

