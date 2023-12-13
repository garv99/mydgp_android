import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import RouteNames from './RouteNames';
import Splash from '../screens/Splash';
import Login from '../screens/Auth/Login';
import LoginOtp from '../screens/Auth/LoginOtp';
import SignupOtp from '../screens/Auth/SignupOtp';
import SignupOtpVerify from '../screens/Auth/SignupOtpVerify';
import Signup from '../screens/Auth/Signup';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={RouteNames.SPLASH}>
        <Stack.Screen name={RouteNames.SPLASH} component={Splash} />
        <Stack.Screen name={RouteNames.HOME} component={Home} />

        <Stack.Screen name={RouteNames.AUTH.LOGINOTP} component={LoginOtp} />
        <Stack.Screen name={RouteNames.AUTH.LOGIN} component={Login} />
        <Stack.Screen name={RouteNames.AUTH.SIGNUPOTP} component={SignupOtp} />
        <Stack.Screen
          name={RouteNames.AUTH.SIGNUPOTPVERIFY}
          component={SignupOtpVerify}
        />
        <Stack.Screen name={RouteNames.AUTH.SIGNUP} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
