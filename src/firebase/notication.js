import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCm0YOlH1VAaztz0-FVUCEO6ML3CtcrTr8',
  authDomain: 'yildirim-7d669.firebaseapp.com',
  projectId: 'yildirim-7d669',
  storageBucket: 'yildirim-7d669.firebasestorage.app',
  messagingSenderId: '712823771071',
  appId: '1:712823771071:web:e1231db290720d2ff51b0a',
  measurementId: 'G-W88GWRLD46',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log('Permission status:', permission);

  if (permission == 'granted') {
    console.log('Notification permission granted.');

    try {
      const token = await getToken(messaging, {
        vapidKey:
          'BAGcsZzkx9ThoJ6n9lh2uciFGm2WPQpl6IqSGQDO1YrMJDgU_lh6ag4dlSU_lvhHkES7l8dciy5WqSHaJkrBsQs',
        serviceWorkerRegistration: await navigator.serviceWorker.register(
          '/firebase-messaging-sw.js',
        ),
      });

      console.log('Generated token:', token);
    } catch (err) {
      console.error('Token error:', err);
    }
  }
};
