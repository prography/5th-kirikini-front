import React, { useState } from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './Home';
import Login from './Login';
import Rate from './Rate';
import Summary from './Summary';
import Settings from './Settings';
import Upload from './Upload';
import Camera from './Camera';

const AppNavigator = createStackNavigator( // todo: stack말고 다른걸로 바꾸기(불필요한 back버튼 생성되니)
  {
    Home: Home,
    Login: Login,
    Rate: Rate,
    Summary: Summary,
    Settings: Settings,
    Upload: Upload,
    Camera: Camera,
  },
  {
    initialRouteName: 'Login',
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
    },
  }
);

export default createAppContainer(AppNavigator);
