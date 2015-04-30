'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkSupport = checkSupport;
exports.verifyPermission = verifyPermission;
exports.sendNotification = sendNotification;
exports['default'] = { checkSupport: checkSupport, verifyPermission: verifyPermission, sendNotification: sendNotification };

function checkSupport() {
  return new Promise(function (resolve, reject) {
    if ('Notification' in window) resolve();else reject(new Error('Notification API not supported.'));
  });
}

function verifyPermission() {
  return new Promise(function (resolve, reject) {
    if (Notification.permission === 'granted') {
      resolve();
    } else {
      Notification.requestPermission(function (permission) {
        if (permission === 'granted') resolve();else reject(new Error('Permissions not guaranteed'));
      });
    }
  });
}

function sendNotification(title, options) {
  return new Promise(function (resolve, reject) {
    try {
      (function () {
        var notification = new Notification(title, options);

        resolve({
          __proto__: notification,

          on: function on(type) {
            return new Promise(function (resolve) {
              notification.addEventListener(type, resolve);
            });
          },

          off: function off(type) {
            return new Promise(function (resolve) {
              notification.removeEventListener(type, resolve);
            });
          }
        });
      })();
    } catch (error) {
      reject(error);
    }
  });
}