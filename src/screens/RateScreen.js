import React, { useState } from 'react';
import { Text, View, StyleSheet, Slider } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Rate = props => {
  const [mealScore, setMealScore] = useState(5);

  const change = mealScore => {
    setMealScore(parseFloat(mealScore));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{String(mealScore)}</Text>
      <Slider
        step={1}
        maximumValue={10}
        onValueChange={change.bind(this)}
        mealScore={mealScore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    fontSize: 50,
    textAlign: 'center'
  }
});

export default Rate;
