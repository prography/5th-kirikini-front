import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './src/screens';

import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
<<<<<<< HEAD

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>    
=======
import SplashScreen from 'react-native-splash-screen';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://80f39517da28453699f627d33362527a@sentry.io/1872780', 
});


const store = configureStore();

const App = props => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 1000);
  // }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
>>>>>>> develop-1
  );
};

export default App;
