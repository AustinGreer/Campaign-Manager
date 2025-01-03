import { useEffect, useState } from 'react';
import { getFCMToken, onMessageListener } from '../services/firebaseConfig';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getFCMToken();
          console.log('Notification permission granted.');
        }
      } catch (error) {
        console.error('Error getting permission:', error);
      }
    };

    requestPermission();

    const unsubscribe = onMessageListener().then(payload => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body
      });
      toast.info(`${payload?.notification?.title}: ${payload?.notification?.body}`);
    });

    return () => {
      unsubscribe.catch(err => console.log('failed: ', err));
    };
  }, []);

  return null;
};

export default Notifications;