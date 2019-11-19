import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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

const Upload = props => {
  const [selected, setSelected] = useState(null);
  const MealTypeButton = () =>
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
    <View>
      <View></View>
      <View style={mealbtSt.container}>
        <MealTypeButton mealTypes={mealTypes} />
      </View>
      <Text>Upload Screen by Seekeryang before 11.30</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Camera')}>
        <View>
          <Text>👉 CameraScreen will be called here</Text>
        </View>
      </TouchableOpacity>
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

const mealbtSt = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: deviceWidth,
    // height: 200,
    padding: 10,
    backgroundColor: 'pink'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (deviceWidth / 5) * 2,
    height: 90,
    marginBottom: 10,
    borderRadius: 100,
    backgroundColor: 'white'
  },
  selected: {
    position: 'absolute',
    width: (deviceWidth / 5) * 2,
    height: 90,
    marginBottom: 10,
    borderRadius: 100,
    backgroundColor: 'green'
  },
  buttonText: {
    position: 'absolute',
    color: 'black',
    fontSize: 20,
    fontWeight: '800'
  }
});

export default Upload;
