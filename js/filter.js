'use strict';
(function () {
  var filtersElement = document.querySelector('.filters');
  var picturesElement = document.querySelector('.pictures');

  var picturesFilters = {
    discussed: {
      sortingFunction: window.utils.sortObjectsArray,
      sortingArgument: 'comments'
    },
    popular: {
      sortingFunction: window.utils.sortObjectsArray,
      sortingArgument: 'likes'
    },
    random: {
      sortingFunction: window.utils.shuffleArray
    },
    sortPicturesData: function (pictures, filter) {
      this[filter].sortingFunction(pictures, this[filter].sortingArgument);
    }
  };

  var onFilterChange = function (evt) {
    var usedFilter = evt.target.value;
    var allPicturesElements = picturesElement.querySelectorAll('.picture');
    allPicturesElements.forEach(removePicture);

    var updatePictures = function () {
      var allPictures = window.data.pictures.slice();
      if (usedFilter !== 'recommend') {
        picturesFilters.sortPicturesData(allPictures, usedFilter);
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
