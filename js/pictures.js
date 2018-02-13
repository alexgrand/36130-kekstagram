'use strict';
(function () {
  window.utils = {
    getRandomNumber: function (max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();

(function () {
  var NUMBER_OF_PICTURES = 25;
  var ALL_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var MAX_LIKES = 200;
  var MIN_LIKES = 15;
  var MAX_COMMENTS = 2;
  var picturesArray = [];

  var getCommentsArray = function (numOfComments) {
    var comments = [];
    for (var i = 0; i < numOfComments; i++) {
      var index = window.utils.getRandomNumber(ALL_COMMENTS.length - 1, 0);
      comments[i] = ALL_COMMENTS[index];
    }
    return comments;
  };
  var generatePictureObject = function (index) {
    return {
      url: 'photos/' + index + '.jpg',
      likes: window.utils.getRandomNumber(MAX_LIKES, MIN_LIKES),
      comments: getCommentsArray(window.utils.getRandomNumber(MAX_COMMENTS, 1))
    };
  };
  var generateAllPictures = function () {
    for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
      picturesArray[i] = generatePictureObject(i + 1);
    }
  };
  generateAllPictures();

  window.data = {
    pictures: picturesArray
  };
})();

(function () {
  var pictureTemplateElement = document.querySelector('#picture-template').content;
  var renderPicture = function (picture) {
    var pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

    return pictureElement;
  };
  window.picture = {
    renderAllPictures: function (element, allPictures) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < allPictures.length; i++) {
        fragment.appendChild(renderPicture(allPictures[i]));
      }
      element.appendChild(fragment);
    }
  };
})();

var ESC_CODE = 27;

var picturesElement = document.querySelector('.pictures');

var galleryOverlayElement = document.querySelector('.gallery-overlay');
var overlayImageElement = galleryOverlayElement.querySelector('.gallery-overlay-image');
var overlayCloseElement = galleryOverlayElement.querySelector('.gallery-overlay-close');
var likeCountElement = galleryOverlayElement.querySelector('.likes-count');
var commentsCountElement = galleryOverlayElement.querySelector('.comments-count');

var uploadFileElement = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancelElement = uploadOverlay.querySelector('.upload-form-cancel');

var effectControlsElement = uploadOverlay.querySelector('.upload-effect-controls');
var effectLevelElement = effectControlsElement.querySelector('.upload-effect-level');
var effectLevelPinElement = effectControlsElement.querySelector('.upload-effect-level-pin');
var effectLevelLineElement = effectControlsElement.querySelector('.upload-effect-level-line');
var effectLevelValueElement = effectControlsElement.querySelector('.upload-effect-level-value');
var effectImagePreviewElement = uploadOverlay.querySelector('.effect-image-preview');

var effects = [
  {name: 'chrome', filter: 'grayscale', value: 1, scale: false},
  {name: 'sepia', filter: 'sepia', value: 1, scale: false},
  {name: 'marvin', filter: 'invert', value: 100, scale: '%'},
  {name: 'phobos', filter: 'blur', value: 3, scale: 'px'},
  {name: 'heat', filter: 'brightness', value: 3, scale: false}
];
var usedEffect = '';

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
var onOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closeOverlay();
  }
};

var openOverlay = function () {
  galleryOverlayElement.classList.remove('hidden');
  runHandlers(openCloseOverlayHandlers, true);
};
var closeOverlay = function () {
  galleryOverlayElement.classList.add('hidden');
  runHandlers(openCloseOverlayHandlers, false);
};
var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  effectLevelElement.classList.add('hidden');
  refreshEffectValues();
  runHandlers(openCloseUploadHandlers, true);
};
var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  uploadFileElement.value = '';
  runHandlers(openCloseUploadHandlers, false);
};

var onOverlayCloseElementClick = function () {
  closeOverlay();
};
var onPicturesElementClick = function (evt) {
  if (evt.target.tagName === 'IMG') {
    evt.preventDefault();

    renderOverlay(evt.target, window.data.pictures);
    openOverlay();
  }
};

var onUploadFileChange = function () {
  openUploadOverlay();
};
var onUploadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closeUploadOverlay();
  }
};
var onUploadFormCancelClick = function () {
  closeUploadOverlay();
};

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

var addRemoveListeners = function (element, eventType, handler, listenerAdd) {
  if (listenerAdd) {
    element.addEventListener(eventType, handler);
  } else {
    element.removeEventListener(eventType, handler);
  }
};

var runHandlers = function (listenersArray, listenerAdd) {
  for (var j = 0; j < listenersArray.length; j++) {
    addRemoveListeners(listenersArray[j].element, listenersArray[j].eventType, listenersArray[j].handler, listenerAdd);
  }
};

var basicHandlers = [
  {element: picturesElement,
    eventType: 'click',
    handler: onPicturesElementClick
  },
  {element: uploadFileElement,
    eventType: 'change',
    handler: onUploadFileChange
  }
];
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
var openCloseUploadHandlers = [
  {element: uploadFormCancelElement,
    eventType: 'click',
    handler: onUploadFormCancelClick
  },
  {element: document,
    eventType: 'keydown',
    handler: onUploadOverlayEscPress
  },
  {element: effectControlsElement,
    eventType: 'change',
    handler: onEffectControlsChange
  },
  {element: effectLevelPinElement,
    eventType: 'mouseup',
    handler: onEffectLevelPinMouseup
  },
];

window.picture.renderAllPictures(picturesElement, window.data.pictures);
runHandlers(basicHandlers, true);
