import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

import OpenAlbum from '../Components/ImagePicker';
import MealTypeButton from '../Components/MealTypeButton';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Upload = props => {
  return (
    <>
      <View>
        <View style={mealPhoto.container}>
          <View style={mealPhoto.image}>
            <Text>이 곳에 이미지가 불러와지겠지</Text>
          </View>
          <View style={mealPhoto.buttonContainer}>
            <TouchableOpacity
              style={mealPhoto.button}
              onPress={() => props.navigation.navigate('Camera')}
            >
              <Text style={mealPhoto.buttonText}>사진 촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={mealPhoto.button}
              onPress={() => OpenAlbum()}
            >
              <Text style={mealPhoto.buttonText}>앨범 불러오기</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 끼니 타입 버튼피들  */}
        <View style={mealbtSt.container}>
          <MealTypeButton />
        </View>
      </View>
      {/* // 완료 버튼 */}
      <TouchableOpacity style={submit.button}>
        <Text> SUBMIT </Text>
      </TouchableOpacity>
    </>
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
const mealPhoto = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'blue'
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    borderRadius: 100,
    backgroundColor: 'white',
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'white'
  },
  buttonText: {
    position: 'absolute',
    color: 'black',
    fontSize: 15,
    fontWeight: '500'
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
    backgroundColor: 'coral'
  },
  buttonText: {
    position: 'absolute',
    color: 'black',
    fontSize: 20,
    fontWeight: '800'
  }
});

const submit = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'coral'
  }
});

export default Upload;
