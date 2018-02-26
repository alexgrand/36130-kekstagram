'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH_PROPORTION = 0.9;
  var effectImagePreviewElement = document.querySelector('.effect-image-preview');
  var picturesContainerElement = document.querySelector('.pictures.container');

  var onImageLoad = function () {
    var imageWidth = effectImagePreviewElement.width;
    var containerWidth = picturesContainerElement.clientWidth;

    if (imageWidth >= containerWidth) {
      effectImagePreviewElement.style.width = containerWidth * IMAGE_WIDTH_PROPORTION + 'px';
    }
    window.uploadFile.openFile();
  };

  window.uploadFile = {
    upload: function (fileElement, openFile) {
      this.openFile = openFile;
      var file = fileElement.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      var onReaderLoad = function () {
        effectImagePreviewElement.src = reader.result;
        effectImagePreviewElement.addEventListener('load', onImageLoad);
      };

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', onReaderLoad);
        reader.readAsDataURL(file);
      }
    }
  };
})();
