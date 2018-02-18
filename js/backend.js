'use strict';
(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var DATA_URL = 'https://js.dump.academy/kekstagram/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;

      var onXHRLoad = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      };
      var onXHRError = function () {
        onError('Произошла ошибка соединения.');
      };
      var onXHRTimeout = function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      };

      xhr.addEventListener('load', onXHRLoad);
      xhr.addEventListener('error', onXHRError);
      xhr.addEventListener('timeout', onXHRTimeout);

      xhr.open('GET', DATA_URL);
      xhr.send();
    }
  };
})();

