'use strict';
(function () {
  var galleryOverlayElement = document.querySelector('.gallery-overlay');
  var overlayImageElement = galleryOverlayElement.querySelector('.gallery-overlay-image');
  var overlayCloseElement = galleryOverlayElement.querySelector('.gallery-overlay-close');
  var likeCountElement = galleryOverlayElement.querySelector('.likes-count');
  var commentsCountElement = galleryOverlayElement.querySelector('.comments-count');

  var openOverlayElement = function (pictureElement) {
    galleryOverlayElement.classList.remove('hidden');
    renderOverlay(pictureElement, window.data.pictures);
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
    window.utils.onDocumentEscPress(evt, closeOverlayElement);
  };
  var onOverlayCloseEnterPress = function (evt) {
    window.utils.onElementEnterPress(evt, closeOverlayElement);
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
    },
    {element: overlayCloseElement,
      eventType: 'keydown',
      handler: onOverlayCloseEnterPress
    }
  ];

  window.utils.setElementTabIndex(overlayCloseElement, 2);

  window.preview = {
    openOverlay: openOverlayElement
  };
})();
