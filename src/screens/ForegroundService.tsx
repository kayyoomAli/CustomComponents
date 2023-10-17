import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const ForegroundService = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remote ', remoteMessage);

      PushNotification.localNotification({
        channelId: 'new',
        title: 'hello',
        message: 'My Notification Message',
        soundName: 'default',
        vibrate: true,
      });
    });

    return unsubscribe;
  }, []);
  return null;
};

export default ForegroundService;
