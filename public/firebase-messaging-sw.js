// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDWaxx6GBFJwx_qHwhZG8tVIzlTo6unlGE",
  authDomain: "maxpollo2.firebaseapp.com",
  projectId: "maxpollo2",
  storageBucket: "maxpollo2.firebasestorage.app",
  messagingSenderId: "535527853914",
  appId: "1:535527853914:web:2daf7718e9ac8b19942d63",
  measurementId: "G-JK983VKY3S",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
