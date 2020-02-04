import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gihoType } from '../store/meal/action';
import { meal, gray, yellow } from '../utils/consts';
import EStyleSheet from 'react-native-extended-stylesheet';
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
  const [selected, setSelected] = useState(null); // todo: state로 관리하는걸 redux로 관리?
  const dispatch = useDispatch();
  // const type = useSelector((store) => store.saved.gihoType);

  const MakeDrinkTypeButton = () =>
    drinkTypes.map(item => {
      return (
        <View key={item.key}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => {
                setSelected(item.key);
                dispatch(gihoType(item.key));
              }}
            >
              {selected === item.key && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelected(item.key)}>
              <Text style={[styles.txt, font.seven]}>{item.text}</Text>
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

const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '25rem',
    width: '25rem',
    marginRight: '8rem',
    borderRadius: 100,
    borderWidth: '3rem',
    borderColor: gray.a
  },
  checkedCircle: {
    width: '19rem',
    height: '19rem',
    borderRadius: 100,
    backgroundColor: yellow.a
  },
  txt: {
    fontSize: '14.5rem',
    lineHeight: '21rem',
    color: gray.c
  }
});
const font = EStyleSheet.create({
  eight:
    Platform.OS === 'ios'
      ? {
          fontWeight: '800'
        }
      : {
          fontWeight: 'bold'
        },
  seven:
    Platform.OS === 'ios'
      ? {
          fontWeight: '700'
        }
      : {
          fontWeight: 'bold'
        },
  six:
    Platform.OS === 'ios'
      ? {
          fontWeight: '600'
        }
      : {
          fontWeight: 'normal'
        }
});
export default DrinkTypeButton;
