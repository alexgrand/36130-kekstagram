'use strict';
(function () {
  var ESC_CODE = 27;

  var createMistakeElement = function () {
    var divElement = document.createElement('div');
    divElement.style = 'left: 50%; margin: 10px 0 0 -210px; width: 420px; height: 40px; z-index: 100; text-align: center; background-color: white; border-radius: 20px 20px; color: red;';
    divElement.style.position = 'absolute';
    divElement.style.fontSize = '5px;';
    divElement.classList.add('mistake', 'hidden');
    document.body.insertAdjacentElement('afterbegin', divElement);
  };
  createMistakeElement();

  window.utils = {
    errorElement: document.querySelector('.mistake'),
    onDocumentEscPress: function (evt, closeFunction) {
      var activeUserNameElement = document.activeElement.classList.contains('upload-form-description');
      if (evt.keyCode === ESC_CODE && !activeUserNameElement) {
        closeFunction();
      }
    },
    getErrorMessage: function (errorMsg) {
      var error = this.errorElement;
      error.textContent = errorMsg;
      error.classList.remove('hidden');
      setTimeout(function () {
        error.classList.add('hidden');
      }, 5000);
    },
    getRandomNumber: function (max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    addRemoveListeners: function (element, eventType, handler, listenerAdd) {
      if (listenerAdd) {
        element.addEventListener(eventType, handler);
      } else {
        element.removeEventListener(eventType, handler);
      }
    },
    runHandlers: function (listenersArray, listenerAdd) {
      for (var j = 0; j < listenersArray.length; j++) {
        this.addRemoveListeners(listenersArray[j].element, listenersArray[j].eventType, listenersArray[j].handler, listenerAdd);
      }
    }
  };
})();
