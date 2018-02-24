'use strict';
(function () {
  var filtersElement = document.querySelector('.filters');
  var picturesElement = document.querySelector('.pictures');

  var picturesFilters = {
    discussed: {
      sortPicturesData: function (pictures) {
        window.utils.sortObjectsArray(pictures, 'comments');
      }
    },
    popular: {
      sortPicturesData: function (pictures) {
        window.utils.sortObjectsArray(pictures, 'likes');
      }
    },
    random: {
      sortPicturesData: function (pictures) {
        window.utils.shuffleArray(pictures);
      }
    }
  };

  var onFilterChange = function (evt) {
    var usedFilter = evt.target.value;
    var allPicturesElements = picturesElement.querySelectorAll('.picture');
    allPicturesElements.forEach(removePicture);

    var updatePictures = function () {
      var allPictures = window.data.pictures.slice();
      if (usedFilter !== 'recommend') {
        picturesFilters[usedFilter].sortPicturesData(allPictures);
      }
      window.picture.renderAllPictures(picturesElement, allPictures);
    };

    window.utils.debounce(updatePictures);
  };

  var removePicture = function (element) {
    picturesElement.removeChild(element);
  };

  var filterHandlers = [
    {element: filtersElement,
      eventType: 'change',
      handler: onFilterChange
    }
  ];

  window.filter = {
    filtratePictures: function () {
      filtersElement.classList.remove('filters-inactive');
      window.utils.runHandlers(filterHandlers, true);
    }
  };
})();
