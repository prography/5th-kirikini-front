import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Evaluebar from '../Components/Evaluebar';
import SelfEvaluate from './SelfEvaluate';

const LoginScreen = props => {
  const navigationOptions = {
    header: null,
  };
  return (
    <SelfEvaluate />
    // <View style={styles.container}>
    //   <View style={styles.titleArea}>

    //     <Text style={styles.title}>Login ddd Screen</Text>

    //     <Button
    //       title="Go to Home"
    //       onPress={() => props.navigation.navigate('Home')}
    //     />
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleArea: {
    width: '100%',

    alignItems: 'center',
  },
});

export default LoginScreen;
