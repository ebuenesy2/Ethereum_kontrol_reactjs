// apps/web/src/AppStartup.jsx
import { useEffect } from 'react';
import { generateToken, messaging } from '../firebase/notication';
import { onMessage } from 'firebase/messaging';

export default function AppStartup() {
  useEffect(() => {
    console.log('🚀 Uygulama başladı');

    //! Kullanıcı giriş yapmış mı kontrolü (örneğin token var mı)
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token bulundu - kullanıcı giriş yapmış olabilir');
      generateToken(); //! token yenileme veya doğrulama işlemi

      onMessage(messaging, (payload) => {
        console.log('Gelen mesaj:', payload);

        const title = payload.notification?.title || payload.data?.title;
        const body = payload.notification?.body || payload.data?.message;

        if (Notification.permission === 'granted') {
          new Notification(title || 'Bildirim', {
            body: body || '',
            icon: '/logo.png',
          });
        }
      });
    }
    if (!token) {
      console.log('Token bulunamadı,- kullanıcı giriş yapmamış olabilir');
    }
    //! Kullanıcı giriş yapmış mı kontrolü (örneğin token var mı) -- Son
  }, []);

  return null; // UI yok, sadece startup logic
}
