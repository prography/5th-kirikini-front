import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// RCTRootView cancelTouches 오류를 해결해준다고 함...
import 'react-native-gesture-handler';

import CameraTest from './CameraTest';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import RateScreen from './RateScreen';
import SummaryScreen from './SummaryScreen';
import SettingsScreen from './SettingsScreen';
import UploadScreen from './UploadScreen';
import WeeklyList from './WeeklyListScreen';
import CameraScreen from './CameraScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    CameraTest: CameraTest,
    Rate: RateScreen,
    Summary: SummaryScreen,
    Settings: SettingsScreen,
    MealUpload: UploadScreen,
    WeeklyList: WeeklyList,
    Camera: CameraScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
