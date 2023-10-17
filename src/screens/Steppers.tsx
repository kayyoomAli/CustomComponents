import React, {useRef, useEffect, useState} from 'react';
import {Animated, Text, View} from 'react-native';

interface timeLineProps {
  index: number;
  item?: any;
  length?: any;
  count: number;
  status: boolean;
  widthOfLine?: number;
  SizeOfCircle?: number;
  AnimatedColor?: string;
  backgroundColor?: string;
  renderItem?: ({item}: timeLineProps) => React.ReactNode;
}

export default function TimeLine({
  item,
  count,
  index,
  length,
  status,
  widthOfLine = 6,
  SizeOfCircle = 20,
  AnimatedColor = 'green',
  backgroundColor = 'lightgrey',
  renderItem,
}: timeLineProps) {
  const [textColor, setTextColor] = useState(false);
  const timeLine = useRef(new Animated.Value(0)).current;
  const circleFill = useRef(new Animated.Value(0)).current;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    Animated.timing(circleFill, {
      toValue: 1,
      delay: 3000 * index,
      duration: 500,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        setTextColor(true);
      }
    });
    Animated.timing(timeLine, {
      toValue: 1,
      delay: 3000 * index,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [circleFill, index, timeLine]);

  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
      <View style={{width: 30, alignItems: 'center'}}>
        <View
          style={[
            {
              overflow: 'hidden',
              height: SizeOfCircle,
              width: SizeOfCircle,
              borderRadius: SizeOfCircle / 2,
              backgroundColor: backgroundColor,
            },
          ]}>
          {status && (
            <Animated.View
              style={[
                {
                  opacity: circleFill,
                  height: SizeOfCircle,
                  width: SizeOfCircle,
                  backgroundColor: AnimatedColor,
                  borderRadius: SizeOfCircle / 2,
                },
              ]}
            />
          )}
        </View>

        {index < length - 1 ? (
          <View
            style={[
              {
                overflow: 'hidden',
                width: widthOfLine,
                minHeight: height,
                marginHorizontal: 2,
                backgroundColor: backgroundColor,
              },
            ]}>
            {status && index < length - count && (
              <Animated.View
                style={[
                  {
                    width: widthOfLine,
                    minHeight: height,
                    backgroundColor: AnimatedColor,
                  },
                  {
                    transform: [
                      {
                        translateY: timeLine.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-height, 0],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
          </View>
        ) : null}
      </View>
      <View
        onLayout={event => {
          setHeight(event.nativeEvent.layout.height);
        }}
        style={{
          marginLeft: 10,
          opacity: textColor && status ? 1 : 0.5,
          width: 300,
        }}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <View>
            <Text
              style={[
                {
                  fontWeight: textColor && status ? 'bold' : '500',
                },
              ]}>
              {item?.title}
            </Text>
            <Text
              style={{
                fontWeight: textColor && status ? '500' : '400',
                width: 200,
              }}>
              {item?.SubTitle}
            </Text>
            <Text style={{color: 'grey'}}>{item?.date}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
