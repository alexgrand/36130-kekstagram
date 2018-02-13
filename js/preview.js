'use strict';
(function () {
  var galleryOverlayElement = document.querySelector('.gallery-overlay');
  var overlayImageElement = galleryOverlayElement.querySelector('.gallery-overlay-image');
  var overlayCloseElement = galleryOverlayElement.querySelector('.gallery-overlay-close');
  var likeCountElement = galleryOverlayElement.querySelector('.likes-count');
  var commentsCountElement = galleryOverlayElement.querySelector('.comments-count');

  var openOverlayElement = function (evt) {
    galleryOverlayElement.classList.remove('hidden');
    renderOverlay(evt.target, window.data.pictures);
    window.utils.runHandlers(openCloseOverlayHandlers, true);
  };
  var closeOverlayElement = function () {
    galleryOverlayElement.classList.add('hidden');
    window.utils.runHandlers(openCloseOverlayHandlers, false);
  };
  var onOverlayCloseElementClick = function () {
    closeOverlayElement();
  };
  var onOverlayEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      closeOverlayElement();
    }
  };

  var renderOverlay = function (photoElement, allPictures) {
    var photoUrl = photoElement.getAttribute('src');
    var digitIndex = photoUrl.search(/\d/g);
    var photoFormat = '.jpg';
    var photoIndex = photoUrl.slice(digitIndex, photoUrl.length - photoFormat.length) - 1;
    var photoCommentsCount = allPictures[photoIndex].comments.length;
    var photoLikesCount = allPictures[photoIndex].likes;

    overlayImageElement.setAttribute('src', photoUrl);
    likeCountElement.textContent = photoLikesCount;
    commentsCountElement.textContent = photoCommentsCount;
  };

  var openCloseOverlayHandlers = [
    {element: overlayCloseElement,
      eventType: 'click',
      handler: onOverlayCloseElementClick
    },
    {element: document,
      eventType: 'keydown',
      handler: onOverlayEscPress
    }
  ];

  window.preview = {
    openOverlay: openOverlayElement,
    closeOverlay: closeOverlayElement
  };
})();