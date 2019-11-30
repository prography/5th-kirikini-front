import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './src/screens';

import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

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
  );
};

export default App;
