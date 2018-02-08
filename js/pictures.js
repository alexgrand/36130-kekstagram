'use strict';
var NUMBER_OF_PICTURES = 25;
var ALL_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MAX_LIKES = 200;
var MIN_LIKES = 15;
var MAX_COMMENTS = 2;
var pictures = [];

var pictureTemplateElement = document.querySelector('#picture-template').content;
var picturesElement = document.querySelector('.pictures');
var galleryOverlayElement = document.querySelector('.gallery-overlay');
var overlayImageElement = galleryOverlayElement.querySelector('.gallery-overlay-image');
var likeCountElement = galleryOverlayElement.querySelector('.likes-count');
var commentsCountElement = galleryOverlayElement.querySelector('.comments-count');

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
    openOverlay: function () {
      galleryOverlayElement.classList.remove('hidden');
      overlayImageElement.setAttribute('src', this.url);
      likeCountElement.textContent = this.likes;
      commentsCountElement.textContent = this.comments.length;
    }
  };
};

var generateAllPictures = function () {
  for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
    pictures[i] = generatePictureObject(i + 1);
  }
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderAllPictures = function (element, allPictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < allPictures.length; i++) {
    fragment.appendChild(renderPicture(allPictures[i]));
  }
  element.appendChild(fragment);
};

generateAllPictures();
renderAllPictures(picturesElement, pictures);
pictures[3].openOverlay();
