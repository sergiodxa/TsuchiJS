export default { checkSupport, verifyPermission, sendNotification };

export function checkSupport () {
  return new Promise((resolve, reject) => {
    if (("Notification" in window)) resolve();
    else reject(new Error('Notification API not supported.'));
  })
}

export function verifyPermission () {
  return new Promise((resolve, reject) => {
    if (Notification.permission === 'granted') {
      resolve();
    } else {
      Notification.requestPermission(permission => {
        if (permission === 'granted') resolve();
        else reject(new Error('Permissions not guaranteed'));
      });
    }
  });
}

export function sendNotification (title, options) {
  return new Promise((resolve, reject) => {
    try {
      let notification = new Notification(title, options);

      resolve({
        __proto__: notification,

        on(type) {
          return new Promise(resolve => {
            notification.addEventListener(type, resolve);
          });
        },

        off(type) {
          return new Promise(resolve => {
            notification.removeEventListener(type, resolve);
          });
        }
      });

    } catch (error) {
      reject(error);
    }
  });
}