import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import Time from './Time';
import Loading from './Loading';
import MealtypeButton from './MealtypeButton'
import FBLogin from './FBLogin'



const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Login: LoginScreen,
      Time: Time,
      Loading: Loading,
      MealtypeButton: MealtypeButton,
      FBLogin : FBLogin,

    },
    {
      initialRouteName: 'Login',
    }
  );


export default createAppContainer(AppNavigator);