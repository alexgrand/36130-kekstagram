'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');

  var onPicturesElementClick = function (evt) {
    if (evt.target.tagName === 'IMG') {
      evt.preventDefault();

      window.preview.openOverlay(evt);
    }
  };
  var onSuccessHandler = function (picturesArray) {
    window.picture.renderAllPictures(picturesElement, picturesArray);
    window.data.pictures = picturesArray;
    window.utils.runHandlers(pictureOverlayHandlers, true);
  };
  var onErrorHandler = function (errorMsg) {
    window.utils.getErrorMessage('Ошибка соединения. Отображены старые фотографии. \n' + errorMsg);
    window.data.generateAllPictures();
    window.picture.renderAllPictures(picturesElement, window.data.pictures);
  };

  var pictureOverlayHandlers = [
    {element: picturesElement,
      eventType: 'click',
      handler: onPicturesElementClick
    }
  ];

  window.backend.load(onSuccessHandler, onErrorHandler);
})();
