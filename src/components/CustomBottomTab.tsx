import {Animated, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';

const CustomBottomTab = ({direction}: any) => {
  const translate = useRef(new Animated.Value(0));

  useEffect(() => {
    if (direction === 'up') {
      startAnimation(0);
    } else {
      startAnimation(80);
    }
  }, [direction]);

  const startAnimation = (toValue: any) => {
    Animated.timing(translate.current, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'red',
        backgroundColor: '#eff3fa',

        transform: [
          {
            translateY: translate.current,
          },
        ],
      }}>
      <Image
        style={{height: 25, width: 25, resizeMode: 'contain'}}
        source={require('../assets/email.png')}
      />
      <Image
        style={{height: 25, width: 25, resizeMode: 'contain'}}
        source={require('../assets/cam.png')}
      />
    </Animated.View>
  );
};

export default CustomBottomTab;
