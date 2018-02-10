'use strict';
var NUMBER_OF_PICTURES = 25;
var ALL_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MAX_LIKES = 200;
var MIN_LIKES = 15;
var MAX_COMMENTS = 2;
var ESC_CODE = 27;
var pictures = [];

var pictureTemplateElement = document.querySelector('#picture-template').content;
var picturesElement = document.querySelector('.pictures');
var galleryOverlayElement = document.querySelector('.gallery-overlay');
var overlayImageElement = galleryOverlayElement.querySelector('.gallery-overlay-image');
var overlayCloseElement = galleryOverlayElement.querySelector('.gallery-overlay-close');
var likeCountElement = galleryOverlayElement.querySelector('.likes-count');
var commentsCountElement = galleryOverlayElement.querySelector('.comments-count');

var uploadFileElement = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancelElement = uploadOverlay.querySelector('.upload-form-cancel');

var effectControlsElement = document.querySelector('.upload-effect-controls');
var effectLevelPinElement = effectControlsElement.querySelector('.upload-effect-level-pin');
var effectLevelLineElement = effectControlsElement.querySelector('.upload-effect-level-line');
var effectLevelValueElement = effectControlsElement.querySelector('.upload-effect-level-value');

var effectLevelValue = effectLevelValueElement.value;

var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getCommentsArray = function (numOfComments) {
  var comments = [];
  for (var i = 0; i < numOfComments; i++) {
    var index = getRandomNumber(ALL_COMMENTS.length - 1, 0);
    comments[i] = ALL_COMMENTS[index];
  }
  return comments;
};
var generatePictureObject = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: getRandomNumber(MAX_LIKES, MIN_LIKES),
    comments: getCommentsArray(getRandomNumber(MAX_COMMENTS, 1)),
    renderPicture: function () {
      var pictureElement = pictureTemplateElement.cloneNode(true);
      pictureElement.querySelector('img').setAttribute('src', this.url);
      pictureElement.querySelector('.picture-likes').textContent = this.likes;
      pictureElement.querySelector('.picture-comments').textContent = this.comments.length;

      return pictureElement;
    }
  };
};
var generateAllPictures = function () {
  for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
    pictures[i] = generatePictureObject(i + 1);
  }
};
var renderAllPictures = function (element, allPictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < allPictures.length; i++) {
    fragment.appendChild(allPictures[i].renderPicture());
  }
  element.appendChild(fragment);
};

var renderOverlay = function (photoElement) {
  var photoUrl = photoElement.getAttribute('src');
  var digitIndex = photoUrl.search(/\d/g);
  var photoFormat = '.jpg';
  var photoIndex = photoUrl.slice(digitIndex, photoUrl.length - photoFormat.length) - 1;
  var photoCommentsCount = pictures[photoIndex].comments.length;
  var photoLikesCount = pictures[photoIndex].likes;

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
  overlayCloseElement.addEventListener('click', onOverlayCloseElementClick);
  document.addEventListener('keydown', onOverlayEscPress);
};
var closeOverlay = function () {
  galleryOverlayElement.classList.add('hidden');
  overlayCloseElement.removeEventListener('click', onOverlayCloseElementClick);
  document.removeEventListener('keydown', onOverlayEscPress);
};
var onOverlayCloseElementClick = function () {
  closeOverlay();
};
var onPicturesElementClick = function (evt) {
  if (evt.target.tagName === 'IMG') {
    evt.preventDefault();

    renderOverlay(evt.target);
    openOverlay();
  }
};

var onUploadFileChange = function () {
  openUploadOverlay();
};
var openUploadOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  uploadFormCancelElement.addEventListener('click', onUploadFormCancelClick);
  document.addEventListener('keydown', onUploadOverlayEscPress);
  effectLevelPinElement.addEventListener('mouseup', onEffectLevelPinMouseup);
};
var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  uploadFileElement.value = '';
  uploadFormCancelElement.removeEventListener('click', onUploadFormCancelClick);
  document.removeEventListener('keydown', onUploadOverlayEscPress);
  effectLevelPinElement.removeEventListener('mouseup', onEffectLevelPinMouseup);
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
var calculateSaturationLevel = function (element) {
  var levelLinePosition = effectLevelLineElement.getBoundingClientRect();
  var levelLineX = Math.floor(levelLinePosition.x);
  var levelLineWidth = levelLinePosition.width;

  var levelPinPosition = element.getBoundingClientRect();
  var levelPinWidth = levelPinPosition.width;
  var levelPinX = Math.floor(levelPinPosition.x);
  var levelPinValue = ((levelPinX + levelPinWidth / 2) - levelLineX) * 100 / levelLineWidth;

  effectLevelValue = levelPinValue;
};

generateAllPictures();
renderAllPictures(picturesElement, pictures);

picturesElement.addEventListener('click', onPicturesElementClick);
uploadFileElement.addEventListener('change', onUploadFileChange);
