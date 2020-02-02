import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { RNCamera } from 'react-native-camera';
// import CameraRoll from "@react-native-community/cameraroll";
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { mealSaved } from '../store/meal/action';
import { deviceWidth, deviceHeight, gray, yellow, kiriColor } from '../utils/consts';
import EStyleSheet from 'react-native-extended-stylesheet';


let email = null;
AsyncStorage.getItem('@email')
  .then(data => (email = data))
  .catch(err => console.log('get email failed'));

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

      AsyncStorage.setItem('@mealImage', data.uri)
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
      if(data.uri) {
        const timestamp = data.timestamp ? data.timestamp : new Date().toISOString()
        const file = {
          uri: data.uri,
          name: `${email}_${timestamp}.jpg`,
          type: 'image/jpg'
        };
        dispatch(mealSaved(file, timestamp));
  
        AsyncStorage.setItem('@mealImage', data.uri)
          .then(result => {
            console.log('image saved to async storage');
            props.navigation.goBack();
          })
          .catch(err => console.log('image save failed'));
      }
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
          captureAudio={false}
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
      <TouchableOpacity onPress={() => openAlbum()} style={cameraSt.button1}>
          <Text style={cameraSt.text1}>앨범에서 불러오기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => takePicture()} style={cameraSt.button2}>
          <Text style={cameraSt.text2}>촬영</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const cameraSt = EStyleSheet.create({
  container: {
    backgroundColor: gray.m,
    flex: 1,
    alignItems: 'center'
  },
  cameraView: {
    width: deviceWidth,
    height:deviceWidth
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '20rem',
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  button1: {
    bottom: 10,
    width: '160rem',
    height: deviceHeight / 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '30rem',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    // elevation: 7,
    marginRight: '20rem'
  },
  button2: {
    bottom: 10,
    width: '150rem',
    height: deviceHeight / 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: yellow.a,
    borderRadius: '30rem',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    // elevation: 7
  },
  text1: {
    textAlign: 'center',
    fontSize: '15rem', 
    fontFamily:'NotoSansCJKkr-Bold',
    color:gray.c
  },
  text2: {
    textAlign: 'center',
    fontSize: '15rem', 
    fontFamily:'NotoSansCJKkr-Bold',
    color: 'white'
  }
});

CameraScreen.navigationOptions = ({navigation}) => ({
  title: "",
  headerBackTitle: "",
  headerShown: Platform.OS === 'ios' ? true : false,
})

export default connect(state => ({
  file: state.meal.saved.file
}))(CameraScreen);
