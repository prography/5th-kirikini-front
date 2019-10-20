import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';



const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Login: LoginScreen,
    },
    {
      initialRouteName: 'Login',
    }
  );


export default createAppContainer(AppNavigator);