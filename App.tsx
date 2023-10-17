//import liraries
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';

import {
  notificationListener,
  requestUserPermission,
} from './src/screens/helper';
import AppNavigator from './src/routes';
import AnimTab1 from './src/routes/bottomTab';
const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then(res => {
          console.log('res+++++', res);
          if (!!res && res === 'granted') {
            requestUserPermission();
            notificationListener();
          }
        })
        .catch(error => {
          console.log('res+++++', error);

          Alert.alert('something wrong');
        });
    } else {
    }
  }, []);
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     console.log('true', remoteMessage);

  //     PushNotification.localNotification({
  //       channelId: 'new channel',
  //       title: 'hello ff',
  //       message: 'My Notification Message',
  //       soundName: 'default',
  //       vibrate: true,
  //     });
  //     // onDisplayNotification();
  //   });

  //   return unsubscribe;
  // }, []);
  return (
    <View style={styles.container}>
      {/* <AppNavigator /> */}

      <AnimTab1 />
      {/* <RecipeAppNavigator /> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
