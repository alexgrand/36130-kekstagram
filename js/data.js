'use strict';
(function () {
  var MAX_LIKES = 200;
  var MIN_LIKES = 15;
  var MAX_COMMENTS = 2;
  var allPictures = [];

  var generatePictureObject = function (index) {
    return {
      url: 'photos/' + index + '.jpg',
      likes: window.utils.getRandomNumber(MAX_LIKES, MIN_LIKES),
      comments: window.utils.getRandomNumber(MAX_COMMENTS, 1)
    };
  };

  window.data = {
    NUMBER_OF_PICTURES: 25,
    pictures: allPictures,
    generateAllPictures: function () {
      for (var i = 0; i < this.NUMBER_OF_PICTURES; i++) {
        this.pictures.push(generatePictureObject(i + 1));
      }
    }
  };
})();
