import tsuchi from './index.js';

// check support
tsuchi.checkSupport()
  .then(() => {
    // then verify and ask for permissions
    tsuchi.verifyPermission()
      .then(() => {
        // then send the notification
        tsuchi.sendNotification('hola mundo', {
          body: 'hola mundo ¿todo bien?',
        }).then(notification => {
          // then you can listen the for events (show, click, close, error) of the notifications
          notification.on('show').then((e) => {
            console.log('Show:');
            console.log(e);
          });
        }).catch(error => console.log(error) );
      })
      .catch(error => console.log(error) );
  })
  .catch(error => {
    console.log(error);
  });