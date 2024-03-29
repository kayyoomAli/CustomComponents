import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

const ForegroundHandler = () => {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage: any) => {
      console.log('handle in foreground', remoteMessage);
      const {notification, messageId} = remoteMessage;

      if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: 'default',
        });
      } else {
        PushNotification.localNotification({
          channelId: 'your-channel-id',
          id: messageId,
          body: 'android',
          title: 'android notif title',
          soundName: 'default',
          vibrate: true,
          playSound: true,
        });
      }
    });
    return unsubscribe;
  }, []);
  return null;
};

export default ForegroundHandler;
