import {Image, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const OnPressAnimation = () => {
  return (
    <View style={{flex: 1}}>
      <AnimatedImage
        style={{height: 50, resizeMode: 'contain', margin: 20, width: 50}}
        source={require('../assets/user.png')}
      />
    </View>
  );
};

export default OnPressAnimation;
