import * as React from 'react';
import {Text, View, StyleSheet, Animated, Image} from 'react-native';

const Header_Max_Height = 200;
const Header_Min_Height = 70;

export default function DynamicHeader({animHeaderValue}: any) {
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animateImageSize = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [100, 50], // Adjust the output range as needed
    extrapolate: 'clamp',
  });

  // Separate variable for borderRadius
  const animateImageBorderRadius = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [50, 50], // Adjust the output range as needed
    extrapolate: 'clamp',
  });

  const animateTextOpacity = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animateTextSize = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [30, 20], // Adjust the output range as needed
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animateHeaderHeight,
          borderBottomWidth: 1,
        },
      ]}>
      <Animated.Image
        style={{
          height: animateImageSize,
          width: animateImageSize,
          borderRadius: animateImageBorderRadius,
          position: 'absolute',
          left: 10,
        }}
        source={require('../assets/images/user.jpg')}
      />
      {/* <Text style={styles.headerText}>A List of Books</Text> */}
      <Animated.Text
        style={[
          styles.headerText,
          {opacity: animateTextOpacity, fontSize: animateTextSize},
        ]}>
        Hii Jhon
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  headerText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
