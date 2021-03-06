'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');

  var onPicturesClick = function (evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
      window.preview.openOverlay(evt.target);
    }
  };
  var onPicturesEnterPress = function (evt) {
    if (evt.target.firstElementChild.tagName === 'IMG') {
      window.utils.onElementEnterPress(evt, window.preview.openOverlay.bind(null, evt.target.firstElementChild));
    }
  };

  var onSuccessHandler = function (picturesArray) {
    window.picture.renderAllPictures(picturesElement, picturesArray);
    window.data.pictures = picturesArray;
    window.filter.filtratePictures();
    window.utils.runHandlers(pictureOverlayHandlers, true);
  };
  var onErrorHandler = function (errorMsg) {
    window.utils.getErrorMessage('Ошибка соединения. Отображены старые фотографии. \n' + errorMsg);
    window.data.generateAllPictures();
    window.picture.renderAllPictures(picturesElement, window.data.pictures);
    window.filter.filtratePictures();
    window.utils.runHandlers(pictureOverlayHandlers, true);
  };

  var pictureOverlayHandlers = [
    {element: picturesElement,
      eventType: 'click',
      handler: onPicturesClick
    },
    {element: picturesElement,
      eventType: 'keydown',
      handler: onPicturesEnterPress
    }
  ];

  window.backend.load(onSuccessHandler, onErrorHandler);
})();
