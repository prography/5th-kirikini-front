import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { RNCamera } from 'react-native-camera';
// import CameraRoll from "@react-native-community/cameraroll";
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { mealSaved } from '../store/meal/action';
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

let email = null;
AsyncStorage.getItem('email')
  .then(data => (email = data))
  .catch(err => console.log('get email failed'));

const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

const CameraScreen = props => {
  const dispatch = useDispatch();

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5 };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);

      const timezoneOffset = new Date().getTimezoneOffset() * 60000;
      const timestamp = new Date(Date.now() - timezoneOffset).toISOString();

      console.log('takePicture time: ', timestamp);

      const file = {
        uri: data.uri,
        name: `${email}_${timestamp}.jpg`,
        type: 'image/jpg'
      };
      dispatch(mealSaved(file, timestamp));

      AsyncStorage.setItem('mealImage', data.uri)
        .then(result => {
          console.log('image saved to async storage');
          props.navigation.goBack();
        })
        .catch(err => console.log('image save failed'));

      // CameraRoll.saveToCameraRoll( data.uri )
    }
  };

  // 사진 앨범 불러오기
  const openAlbum = () => {
    const options = {
      title: '음식 사진을 선택해주세요',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, data => {
      console.log('openAlbum time: ', data.timestamp);

      const file = {
        uri: data.uri,
        name: `${email}_${data.timestamp}.jpg`,
        type: 'image/jpg'
      };
      dispatch(mealSaved(file, data.timestamp));

      AsyncStorage.setItem('mealImage', data.uri)
        .then(result => {
          console.log('image saved to async storage');
          props.navigation.goBack();
        })
        .catch(err => console.log('image save failed'));
    });
  };

  const CameraView = () => {
    return (
      <TouchableOpacity onPress={() => takePicture()}>
        <RNCamera
          ref={ref => {
            camera = ref;
          }}
          style={cameraSt.cameraView}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={cameraSt.container}>
      {/* <TouchableOpacity onPress={() => takePicture()}>
        <RNCamera
          ref={ref => {
            camera = ref;
          }}
          style={cameraSt.cameraView}
        />
      </TouchableOpacity> */}
      <CameraView />
      <View style={cameraSt.buttonContainer}>
        <TouchableOpacity onPress={() => takePicture()} style={cameraSt.button}>
          <Text style={cameraSt.text}>촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openAlbum()} style={cameraSt.button}>
          <Text style={cameraSt.text}>앨범에서 불러오기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const cameraSt = StyleSheet.create({
  container: {
    backgroundColor: gray.m,
    flex: 1
  },
  cameraView: {
    width: deviceWidth,
    height: deviceWidth
  },
  buttonContainer: {
    position: 'absolute',
    top: deviceWidth,
    padding: 17,
    flexDirection: 'column'
  },
  button: {
    height: deviceHeight / 8,
    width: deviceWidth - 34,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1
  },
  text: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
    color: gray.d,
    textAlign: 'center'
  }
});

export default connect(state => ({
  file: state.meal.saved.file
}))(CameraScreen);
