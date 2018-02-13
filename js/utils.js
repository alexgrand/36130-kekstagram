'use strict';
(function () {
  window.utils = {
    getRandomNumber: function (max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    addRemoveListeners: function (element, eventType, handler, listenerAdd) {
      if (listenerAdd) {
        element.addEventListener(eventType, handler);
      } else {
        element.removeEventListener(eventType, handler);
      }
    },
    runHandlers: function (listenersArray, listenerAdd) {
      for (var j = 0; j < listenersArray.length; j++) {
        this.addRemoveListeners(listenersArray[j].element, listenersArray[j].eventType, listenersArray[j].handler, listenerAdd);
      }
    }
  };
})();