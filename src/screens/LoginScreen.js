import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const LoginScreen = props => {
  const navigationOptions = {
    header: null,
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>Login Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => props.navigation.navigate('Home')}
        />
      </View>
    </View>
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
