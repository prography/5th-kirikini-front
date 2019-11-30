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
    text: '집밥',
    color: meal.a
  },
  {
    key: 1,
    text: '외식',
    color: meal.b
  },
  {
    key: 2,
    text: '배달',
    color: meal.c
  },
  {
    key: 3,
    text: '간편',
    color: meal.d
  }
];

const MealTypeButton = props => {
  const [selected, setSelected] = useState(null);
  const MakeMealTypeButton = () =>
    mealTypes.map(item => {
      return (
        <TouchableOpacity
          key={item.key}
          style={btColor(item.color).button}
          onPress={() => setSelected(item.key)}
        >
          {selected === item.key && (
            <View style={btColor(item.color).selected} />
          )}
          {selected !== item.key && (
            <Text style={mealbtSt.txtUnselected}> {item.text}</Text>
          )}
          {selected === item.key && (
            <Text style={mealbtSt.txtSelected}> {item.text}</Text>
          )}
          {/* <Text style={mealbtSt.buttonText}> {item.text}</Text> */}
        </TouchableOpacity>
      );
    });

  return (
    <View style={mealbtSt.container}>
      <MakeMealTypeButton mealTypes={mealTypes} />
    </View>
  );
};

const btColor = color =>
  StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 67,
      height: 67,
      marginBottom: 10,
      borderRadius: 100,
      backgroundColor: color + '35'
    },
    selected: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 67,
      height: 67,
      marginBottom: 10,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: yellow.a,
      backgroundColor: color
    }
  });

const mealbtSt = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100

    // backgroundColor: 'pink'
  },

  // selected: {
  //   position: 'absolute',
  //   width: 70,
  //   height: 70,
  //   marginBottom: 10,
  //   borderRadius: 100,
  //   borderWidth: 4,
  //   borderColor: yellow.a,
  //   backgroundColor: meal.c
  // },
  txtUnselected: {
    position: 'absolute',
    textAlign: 'center',
    color: gray.d,
    fontSize: 17,
    fontWeight: '500'
  },
  txtSelected: {
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '900'
  }
});

export default MealTypeButton;
