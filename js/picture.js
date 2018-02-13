'use strict';
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
