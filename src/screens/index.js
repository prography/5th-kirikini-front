import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// RCTRootView cancelTouches 오류를 해결해준다고 함...
import 'react-native-gesture-handler';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
