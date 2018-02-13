'use strict';
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
