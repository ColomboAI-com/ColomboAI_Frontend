importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyA5t2XnnCMsCg7SE-odHhX1o5gHIxX2kBQ",
    authDomain: "fair-myth-398920.firebaseapp.com",
    projectId: "fair-myth-398920",
    storageBucket: "fair-myth-398920.appspot.com",
    messagingSenderId: "337112930405",
    appId: "1:337112930405:web:17eacc2b7bcb726f40ce8c",
    measurementId: "G-0E3CP5TCHK"
  
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});