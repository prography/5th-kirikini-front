import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

const drinkTypes = [
  {
    key: 0,
    text: '커피'
  },
  {
    key: 1,
    text: '음주'
  }
];

const DrinkTypeButton = props => {
  const [selected, setSelected] = useState(null);

  const MakeDrinkTypeButton = () =>
    drinkTypes.map(item => {
      return (
        <View>
          <View key={item.key} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => setSelected(item.key)}
            >
              {selected === item.key && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelected(item.key)}>
              <Text style={styles.txt}>{item.text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  return (
    <View style={styles.container}>
      <MakeDrinkTypeButton drinkTypes={drinkTypes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    width: 370
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 27,
    width: 27,
    marginRight: 15,
    borderRadius: 100,
    borderWidth: 2.5,
    borderColor: gray.a
  },
  checkedCircle: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: yellow.a
  },
  txt: {
    fontSize: 16,
    fontWeight: '600',
    color: gray.d
  }
});

export default DrinkTypeButton;