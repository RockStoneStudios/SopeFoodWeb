importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCZa7_ShNVP84CP_J0PomrfQSmvPpY7_Wo",
    authDomain: "sopefoods-7e27f.firebaseapp.com",
    projectId: "sopefoods-7e27f",
    storageBucket: "sopefoods-7e27f.appspot.com",
    messagingSenderId: "255294573124",
    appId: "1:255294573124:android:a52f8e8e3cb2d49750ca11",
    databaseURL: "..." 
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});