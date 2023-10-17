import {Animated, Image, TextInput, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

const CustomTextInput = ({direction}: any) => {
  const translate = useRef(new Animated.Value(0));

  useEffect(() => {
    if (direction === 'up') {
      startAnimation(0);
    } else {
      startAnimation(-40);
    }
  }, [direction]);

  const startAnimation = (toValue: any) => {
    Animated.timing(translate.current, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const opacity = translate.current.interpolate({
    inputRange: [-40, 0],
    outputRange: [0, 1],
  });
  return (
    <Animated.View
      style={{
        transform: [{translateY: translate.current}],
        opacity,
        position: 'absolute',
        flex: 1,
        width: '100%',
        zIndex: 99,
      }}>
      <View
        style={{
          marginHorizontal: 10,
          borderRadius: 50,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          backgroundColor: '#eff3fa',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}>
        <Image
          style={{height: 20, width: 20, resizeMode: 'contain'}}
          source={require('../assets/menu.png')}
        />
        <TextInput
          style={{flex: 1, marginLeft: 10}}
          placeholder="Search in mail"
        />
        <Image
          style={{height: 20, width: 20, resizeMode: 'contain'}}
          source={require('../assets/user.png')}
        />
      </View>
    </Animated.View>
  );
};

export default CustomTextInput;
