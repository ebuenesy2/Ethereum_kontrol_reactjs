importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCm0YOlH1VAaztz0-FVUCEO6ML3CtcrTr8',
  authDomain: 'yildirim-7d669.firebaseapp.com',
  projectId: 'yildirim-7d669',
  messagingSenderId: '712823771071',
  appId: '1:712823771071:web:e1231db290720d2ff51b0a',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('🔥 BACKGROUND MESSAGE RECEIVED:', payload);

  const title = payload?.notification?.title || payload?.data?.title || 'Yeni Bildirim';

  const body = payload?.notification?.body || payload?.data?.message || 'Mesaj içeriği yok';

  self.registration.showNotification(title, {
    body,
  });
});
