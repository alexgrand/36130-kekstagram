'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');

  var onPicturesElementClick = function (evt) {
    if (evt.target.tagName === 'IMG') {
      evt.preventDefault();

      window.preview.openOverlay(evt);
    }
  };

  var pictureOverlayHandlers = [
    {element: picturesElement,
      eventType: 'click',
      handler: onPicturesElementClick
    }
  ];
  window.picture.renderAllPictures(picturesElement, window.data.pictures);
  window.utils.runHandlers(pictureOverlayHandlers, true);
})();
