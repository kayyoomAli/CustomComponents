import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import notifee, {AndroidImportance} from '@notifee/react-native';
const Login = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default144',
      name: 'Default Channel132',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId, // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        actions: [
          {
            title: 'Accept',
            pressAction: {
              id: 'default',
            },
          },
          {
            title: 'decline',
            pressAction: {
              id: 'default',
            },
          },
        ],
      },
    });
  }

  return (
    <View>
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
