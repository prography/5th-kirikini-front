import React, { useState } from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// RCTRootView cancelTouches 오류를 해결해준다고 함...
import 'react-native-gesture-handler';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['`-[RCTRootView cancelTouches]`']);

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import RateScreen from './RateScreen';
import SummaryScreen from './SummaryScreen';
import SettingsScreen from './SettingsScreen';
import UploadScreen from './UploadScreen';
import CameraScreen from './CameraScreen';
import NavBar from '../Components/NavBar';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Rate: RateScreen,
    Summary: SummaryScreen,
    Settings: SettingsScreen,
    Upload: UploadScreen,
    Camera: CameraScreen,
    NavBar: NavBar
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#F2F9F2',
        borderBottomWidth: 0,
        shadowColor: 'transparent'
      },
      headerTintColor: '#F9CD15',
      headerTitleStyle: {
        fontWeight: '700'
      }
    }
  }
);

export default createAppContainer(AppNavigator);
