# TsuchiJS
Promised based wrapper for the browser's Notification API made in ECMAScript 6.

## How to use:
Load the library:

```javascript
import tsuchi from 'tsuchijs';
```

Then you can verify the compatibility, ask permission and send a notification:

```javascript
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
            // do something when the notification is showed
          });
        }).catch(error => console.log(error) );
      })
      .catch(error => console.log(error) );
  })
  .catch(error => {
    console.log(error);
  })
```

## Methods
All methods return a promise.

### tsuchi.checkSupport()
This methods check if the browser support notifications.

### tsuchi.verifyPermission()
This method verify if you has permissions to use notifications, if you never asked for permission ask the user.

### tsuchi.sendNotification()
This method receive a string with the title of the notification and an object who can has the following attributes:
```json
{
  "body": "A string representing an extra content to display within the notification",
  "dir" : "The direction of the notification; it can be auto, ltr, or rtl",
  "icon": "The URL of an image to be used as an icon by the notification",
  "lang": "Specify the lang used within the notification. This string must be a valid BCP 47 language tag.",
  "tag" : "An ID for a given notification that allows to retrieve, replace or remove it if necessary"
}
```
If there wasn't any problem with the notification you can execute the then callback who receive the notification object with the methods on and off who are a promised addEventListener and removeEventListener.

## License
The MIT License (MIT)

Copyright (c) 2015 Sergio Daniel Xalambrí

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.