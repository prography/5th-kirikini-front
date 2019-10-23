import React from 'react';
import AppNavigator from './src/screens';

import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>    
  );
};


export default App;