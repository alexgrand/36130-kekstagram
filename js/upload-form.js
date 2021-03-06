'use strict';
(function () {
  var uploadFormElement = document.querySelector('.upload-form');
  var uploadFileElement = document.querySelector('#upload-file');
  var uploadFileLabelElement = uploadFormElement.querySelector('.upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancelElement = uploadOverlay.querySelector('.upload-form-cancel');

  var openUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    window.scaling.addScalingHandlers();
    window.effects.addEffectsHandlers();
    window.validation.addValidationHandlers();
    window.utils.runHandlers(openCloseUploadHandlers, true);
  };
  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    uploadFileElement.value = '';
    window.scaling.removeScalingHandlers();
    window.effects.removeEffectsHandlers();
    window.validation.removeValidationHandlers();
    window.utils.runHandlers(openCloseUploadHandlers, false);
  };

  var onUploadFileChange = function (evt) {
    window.uploadFile.upload(evt.target, openUploadOverlay);
  };
  var onUploadFormEscPress = function (evt) {
    window.utils.onDocumentEscPress(evt, closeUploadOverlay);
  };
  var onUploadFormCancelClick = function () {
    closeUploadOverlay();
  };
  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(evt.target);
    window.backend.upload(data, onFormSubmitSuccess, onFormSubmitError);
  };
  var onFormSubmitSuccess = function () {
    closeUploadOverlay();
  };
  var onFormSubmitError = function (errorMsg) {
    window.utils.getErrorMessage('Ошибка отправки фотографии. ' + errorMsg);
  };

  var onUploadFileLabelEnterPress = function (evt) {
    window.utils.onElementEnterPress(evt, createClickEventOnFileLabel);
  };
  var createClickEventOnFileLabel = function () {
    var event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    uploadFileElement.dispatchEvent(event);
  };

  var uploadHandlers = [
    {element: uploadFileElement,
      eventType: 'change',
      handler: onUploadFileChange
    },
    {element: uploadFileLabelElement,
      eventType: 'keydown',
      handler: onUploadFileLabelEnterPress
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
    },
    {element: uploadFormElement,
      eventType: 'submit',
      handler: onUploadFormSubmit}
  ];

  window.utils.setElementTabIndex(uploadFileLabelElement, 0);
  window.utils.runHandlers(uploadHandlers, true);
})();

