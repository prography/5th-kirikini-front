import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginScreen = props => {
  const navigationOptions = {
    header: null
  };
  return (
    <View>
      <Text>hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  titleArea: {
    width: '100%',
    alignItems: 'center'
  }
});

export default LoginScreen;
