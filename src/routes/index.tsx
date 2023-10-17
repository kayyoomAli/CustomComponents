import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import navigationService from '../utils/navigationService';
import Login from '../screens/login';
import SignUp from '../screens/signup';
import HomeScreen from '../screens/homeScreen';
import Carousal from '../screens/Carousal';
import ToastUseCase from '../screens/ToastUseCase';
import GmailAnimationUseCase from '../screens/GmailAnimationUseCase';
import {AndroidWidgets} from '../screens/AndroidWidegts';
import OnPressAnimation from '../screens/OnPressAnimation';
import UseAccordion from '../screens/useAccordian';
import CustomTodoApp from '../screens/TodoApp';
import OTPInputFieldAndroid from '../screens/OtpVerify';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Otp"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={'login'} component={Login} />
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'signUp'} component={SignUp} />
        <Stack.Screen name={'Carousal'} component={Carousal} />
        <Stack.Screen name={'Anim'} component={OnPressAnimation} />
        <Stack.Screen name={'Otp'} component={OTPInputFieldAndroid} />

        <Stack.Screen name={'Android'} component={AndroidWidgets} />
        <Stack.Screen name={'Toast'} component={ToastUseCase} />
        <Stack.Screen name={'Gmail'} component={GmailAnimationUseCase} />
        <Stack.Screen name={'Accord'} component={UseAccordion} />
        <Stack.Screen name={'Todo'} component={CustomTodoApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
