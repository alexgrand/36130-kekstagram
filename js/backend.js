'use strict';
(function () {
  window.backend = {
    DATA_URL: 'https://js.dump.academy/kekstagram/data',
    UPLOAD_URL: 'https://js.dump.academy/kekstagram',
    request: function (method, url, onLoad, onError, data) {
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

      xhr.open(method, url);
      if (method === 'GET') {
        xhr.send();
      } else if (method === 'POST') {
        xhr.send(data);
      }
    },
    load: function (onLoad, onError) {
      this.request('GET', this.DATA_URL, onLoad, onError);
    },
    upload: function (data, onLoad, onError) {
      this.request('POST', this.UPLOAD_URL, onLoad, onError, data);
    }
  };
})();
