(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _tsuchi = require('./index.js');

var _tsuchi2 = _interopRequireDefault(_tsuchi);

// check support
_tsuchi2['default'].checkSupport().then(function () {
  // then verify and ask for permissions
  _tsuchi2['default'].verifyPermission().then(function () {
    // then send the notification
    _tsuchi2['default'].sendNotification('hola mundo', {
      body: 'hola mundo ¿todo bien?' }).then(function (notification) {
      // then you can listen the for events (show, click, close, error) of the notifications
      notification.on('show').then(function (e) {
        console.log('Show:');
        console.log(e);
      });
    })['catch'](function (error) {
      return console.log(error);
    });
  })['catch'](function (error) {
    return console.log(error);
  });
})['catch'](function (error) {
  console.log(error);
});

},{"./index.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1])