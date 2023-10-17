import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
// import Icon, {Icons} from '../components/Icons';
import ColorScreen from '../screens/ColorScreen';
import * as Animatable from 'react-native-animatable';
import Colors from '../utils/Colors';
import {NavigationContainer} from '@react-navigation/native';
const Icons = require('../assets/images/menu.png');
const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons,
    icon: 'home',
    component: ColorScreen,
  },
  {
    route: 'Search',
    label: 'Search',
    type: Icons,
    icon: 'search',
    component: ColorScreen,
  },
  {
    route: 'Add',
    label: 'Add',
    type: Icons,
    icon: 'plus-square',
    component: ColorScreen,
  },
  {
    route: 'Like',
    label: 'Like',
    type: Icons,
    icon: 'heart',
    component: ColorScreen,
  },
  {
    route: 'Account',
    label: 'Account',
    type: Icons,
    icon: 'user-circle-o',
    component: ColorScreen,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.2},
  0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          {/* <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.primary}
          /> */}
          <Image
            style={[
              styles.bottomTabImageStyle,
              {
                backgroundColor: focused ? Colors.white : Colors.primary,
              },
            ]}
            source={require('../assets/images/menu.png')}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab1() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: props => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomTabImageStyle: {
    height: 20,
    width: 20,
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.primary,
  },
});
