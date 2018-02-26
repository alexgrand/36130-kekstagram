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
      this[filter].sortingFunction.call(window.utils, pictures, this[filter].sortingArgument);
    }
  };

  var onFilterChange = function (evt) {
    var usedFilter = evt.target.value;
    window.utils.debounce(updatePictures.bind(null, usedFilter));
  };
  var onFiltersEnterPress = function (evt) {
    if (evt.target.tagName === 'LABEL') {
      if (evt.keyCode === window.utils.code.ENTER) {
        var filterInputElement = evt.target.previousElementSibling;
        var usedFilter = filterInputElement.value;
        filterInputElement.checked = true;
        window.utils.debounce(updatePictures.bind(null, usedFilter));
      }
    }
  };

  var removePicture = function (element) {
    picturesElement.removeChild(element);
  };
  var addFiltersUsability = function () {
    var allFilters = filtersElement.querySelectorAll('label');
    allFilters.forEach(function (it) {
      window.utils.setElementTabindex(it, 0);
    });
  };
  var updatePictures = function (usedFilter) {
    var allPicturesElements = picturesElement.querySelectorAll('.picture');
    var allPictures = window.data.pictures.slice();
    allPicturesElements.forEach(removePicture);
    if (usedFilter !== 'recommend') {
      picturesFilters.sortPicturesData(allPictures, usedFilter);
    }
    window.picture.renderAllPictures(picturesElement, allPictures);
  };

  var filterHandlers = [
    {element: filtersElement,
      eventType: 'change',
      handler: onFilterChange
    },
    {element: filtersElement,
      eventType: 'keydown',
      handler: onFiltersEnterPress
    }
  ];

  window.filter = {
    filtratePictures: function () {
      filtersElement.classList.remove('filters-inactive');
      addFiltersUsability();
      window.utils.runHandlers(filterHandlers, true);
    }
  };
})();
