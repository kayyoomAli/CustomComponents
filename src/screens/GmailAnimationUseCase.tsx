import {NativeScrollEvent, NativeSyntheticEvent, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomBottomTab from '../components/CustomBottomTab';
import CustomTextInput from '../components/CustomTextInput';
import CustomVerticalList from '../components/CustomVerticalList';

const GmailAnimationUseCase = () => {
  const listRef = useRef(0);
  const currentDirection = useRef('up');

  const [scrollingDirection, setScrollingDirection] = useState('up');

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    const direction = offsetY > listRef.current && offsetY > 0 ? 'down' : 'up';
    if (currentDirection.current !== direction) {
      currentDirection.current = direction;
      setScrollingDirection(direction);
    }

    listRef.current = offsetY;
  };

  return (
    <View style={{flex: 1}}>
      <CustomTextInput direction={scrollingDirection} />
      <CustomVerticalList
        direction={scrollingDirection}
        onScroll={handleScroll}
      />
      <CustomBottomTab direction={scrollingDirection} />
    </View>
  );
};

export default GmailAnimationUseCase;
