import React from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, Dimensions,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { RNCamera } from 'react-native-camera';
// import CameraRoll from "@react-native-community/cameraroll";
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { mealSaved } from '../store/meal/action';

let email = null;
AsyncStorage.getItem('email')
  .then(data => email = data)
  .catch(err => console.log("get email failed"))

const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

const CameraScreen = (props) => {
  const dispatch = useDispatch();

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5 };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      const timestamp = new Date().toISOString().replace(/:/gi, "-")

      const file = {
        uri: data.uri,
        name: `${email}_${timestamp}.jpg`,
        type: "image/jpg"
      }
      dispatch(mealSaved(file));
      
      AsyncStorage.setItem('mealImage', data.uri)
        .then(result => {
          console.log("image saved to async storage")
          props.navigation.goBack();
        })
        .catch(err => console.log("image save failed"))

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
      data.timestamp = data.timestamp.replace(/:/gi, "-")
      console.log(data.timestamp)

      const file = {
        uri: data.uri,
        name: `${email}_${data.timestamp}.jpg`,
        type: "image/jpg"
      }
      dispatch(mealSaved(file));

      AsyncStorage.setItem('mealImage', data.uri)
        .then(result => {
          console.log("image saved to async storage")
          props.navigation.goBack();
        })
        .catch(err => console.log("image save failed"))

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
    <View>
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
  cameraView: {
    width: deviceWidth,
    height: deviceWidth
  },
  buttonContainer: {
    padding: 30,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginBottom: 30,
    borderRadius: 100,
    backgroundColor: '#7BB78E'
  },
  text: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center'
  }
});

export default connect(state => ({
  file: state.meal.saved.file
}))(CameraScreen);