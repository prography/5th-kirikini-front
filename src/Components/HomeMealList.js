import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
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

const OneMealCircle = props => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log('모달:' + modalVisible);

  var circleColor = meal.a;
  if (props.mealType === 'a') {
    circleColor = meal.a;
  }
  if (props.mealType === 'b') {
    circleColor = meal.b;
  }
  if (props.mealType === 'c') {
    circleColor = meal.c;
  } else {
    circleColor = meal.d;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={{
          position: 'absolute',
          left:
            ((((deviceWidth - 20) * 7) / 8 - 65) / 24) * props.oneMealTime -
            (props.oneMealScore * 6 + 20) / 2 +
            32.5,
          width: props.oneMealScore * 6 + 20,
          height: props.oneMealScore * 6 + 20,
          borderRadius: 100,
          backgroundColor: circleColor
        }}
      />

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            width: deviceWidth,
            height: deviceHeight
          }}
        >
          <Image
            source={props.imgSrc}
            style={{
              top: deviceHeight / 2 - 150,
              alignSelf: 'center',
              backgroundColor: 'pink',
              width: 300,
              height: 300,
              borderRadius: 500
            }}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const homeMealListArray = [
  {
    key: 0,
    oneMealScore: 2,
    oneMealTime: 6,
    mealType: 'a',
    imgSrc: require('../img/foodExample1.jpeg')
  },
  {
    key: 1,
    oneMealScore: 9,
    oneMealTime: 13,
    mealType: 'b',
    imgSrc: require('../img/foodExample2.jpeg')
  },
  {
    key: 2,
    oneMealScore: 7,
    oneMealTime: 23,
    mealType: 'c',
    imgSrc: require('../img/foodExample3.jpeg')
  }
];

const HomeMealList = () => {
  const MakeMealCircle = () =>
    homeMealListArray.map(item => {
      return (
        <OneMealCircle
          key={item.key}
          oneMealScore={item.oneMealScore}
          oneMealTime={item.oneMealTime}
          mealType={item.mealType}
          imgSrc={item.imgSrc}
        />
      );
    });

  return (
    <>
      <Image
        source={require('../img/iconSunBig.png')}
        style={{
          width: 70,
          height: 70,

          resizeMode: 'contain',
          marginLeft: 17,
          marginRight: 17
        }}
      />
      <View style={styles.container}>
        <MakeMealCircle />
      </View>
      <Image
        source={require('../img/iconMoonBig.png')}
        style={{
          width: 70,
          height: 70,

          resizeMode: 'contain',
          marginLeft: 17,
          marginRight: 17
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 100,
    width: deviceWidth
    // backgroundColor: gray.c
  }
});

export default HomeMealList;
