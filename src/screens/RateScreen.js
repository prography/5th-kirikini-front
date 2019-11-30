import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

import NavBar from '../Components/NavBar';
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
const Rate = props => {
  const [mealScore, setMealScore] = useState(5);

  const change = mealScore => {
    setMealScore(parseFloat(mealScore));
  };

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleHeader}>
          <Text style={styles.txtBigTitle}>끼니 채점</Text>
        </View>
        <View>
          <View style={mainImg.screen}></View>
        </View>
        <View style={slider.container}>
          <Text style={slider.txtScore}>{String(mealScore)}</Text>
          <Slider
            step={1}
            value={5}
            thumbTintColor={yellow.a}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor={yellow.a}
            maximumTrackTintColor={gray.b}
            onValueChange={change.bind(this)}
            mealScore={mealScore}
          />
        </View>
      </View>
      <NavBar navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: '#F2F9F2'
  },
  titleHeader: {
    height: 60
  },
  txtBigTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: gray.d
  }
});

const slider = StyleSheet.create({
  container: {
    marginTop: 120
  },
  txtScore: {
    marginBottom: 20,
    fontSize: 40,
    fontWeight: '700',
    color: yellow.b,
    textAlign: 'center'
  }
});

const mainImg = StyleSheet.create({
  screen: {
    width: deviceWidth - 34,
    height: 290,
    borderTopLeftRadius: 45,
    borderBottomRightRadius: 45,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1
  }
});

export default Rate;
