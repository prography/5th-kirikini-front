import React, { useState } from 'react';
import { Text, View, StyleSheet, Slider } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import NavBar from '../Components/NavBar';

const Rate = props => {
  const [mealScore, setMealScore] = useState(5);

  const change = mealScore => {
    setMealScore(parseFloat(mealScore));
  };

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.text}>{String(mealScore)}</Text>
        <Slider
          step={1}
          maximumValue={10}
          onValueChange={change.bind(this)}
          mealScore={mealScore}
        />
      </View>
      <NavBar navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F2F9F2'
  },
  text: {
    fontSize: 50,
    textAlign: 'center'
  }
});

export default Rate;
