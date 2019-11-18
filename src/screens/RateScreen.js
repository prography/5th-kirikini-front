import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const mealTypes = [
  {
    key: 0,
    text: '집밥'
  },
  {
    key: 1,
    text: '일밥'
  },
  {
    key: 2,
    text: '이밥'
  },
  {
    key: 3,
    text: '삼밥'
  }
];

// const MealTypeButton = () =>
//   mealTypes.map(item => {
//     return (
//       <View>
//         <View key={item.key} style={styles.buttonContainer}>
//           <Text>{item.text}</Text>
//           <TouchableOpacity style={styles.circle} />
//         </View>
//       </View>
//     );
//   });

const Rate = props => {
  const [selected, setSelected] = useState(null);

  const MealTypeButton = () =>
    mealTypes.map(item => {
      return (
        <View>
          <View key={item.key} style={styles.buttonContainer}>
            <Text>{item.text}</Text>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => setSelected(item.key)}
            >
              {selected === item.key && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  return (
    <View>
      <MealTypeButton mealTypes={mealTypes} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B'
  }
});

export default Rate;
