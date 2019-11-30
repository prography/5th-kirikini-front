import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const gray = {
  m: '#F2F9F2',
  a: '#EAEAEA',
  b: '#B7B7B7',
  c: '#898989',
  d: '#505151'
};

const yellow = {
  a: '#FCDB3A',
  b: '#F9CD15'
};

const meal = {
  a: '#C8BAE5',
  b: '#AFEAA2',
  c: '#AFCAF2',
  d: '#9CD8C8'
};

const mealTypes = [
  {
    key: 0,
    text: '집밥'
  },
  {
    key: 1,
    text: '외식'
  },
  {
    key: 2,
    text: '배달'
  },
  {
    key: 3,
    text: '간편'
  }
];

const MealTypeButton = props => {
  const [selected, setSelected] = useState(null);
  const MakeMealTypeButton = () =>
    mealTypes.map(item => {
      return (
        <TouchableOpacity
          key={item.key}
          style={mealbtSt.button}
          onPress={() => setSelected(item.key)}
        >
          {selected === item.key && <View style={mealbtSt.selected} />}
          <Text style={mealbtSt.buttonText}> {item.text}</Text>
        </TouchableOpacity>
      );
    });

  return (
    <View style={mealbtSt.container}>
      <MakeMealTypeButton mealTypes={mealTypes} />
    </View>
  );
};

const mealbtSt = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100

    // backgroundColor: 'pink'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 100,
    backgroundColor: meal.b,
    opacity: 1
  },
  selected: {
    position: 'absolute',
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 100,
    backgroundColor: meal.c
  },
  buttonText: {
    position: 'absolute',
    color: gray.d,
    fontSize: 18,
    fontWeight: '500'
  }
});

export default MealTypeButton;
