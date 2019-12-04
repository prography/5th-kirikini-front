import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
// import CameraRoll from "@react-native-community/cameraroll";
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import secretKey from '../../secrets_front.json'

// AWS S3
const s3_options = {
  keyPrefix: "uploads/",
  bucket: "kirikini",
  region: "ap-northeast-2",
  accessKey: "AKIAWMXSZW6I2XTZR5HX",
  secretKey: secretKey['AWS_S3_SECRET_KEY'],
  successActionStatus: 201
}

const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

const CameraScreen = () => {
  // 촬영 버튼에 적용할 takePicture()
  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5 };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);

      const file = {
        uri: data.uri,
        name: "image.jpg",
        type: "image/jpg"
      }

      RNS3.put(file, s3_options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body);
      });

      // CameraRoll.saveToCameraRoll( data.uri )
    }
  };
  // 넌 뭐하는 애니?
  // const natvigationOptions = {
  //   header: null,
  // };

  // 사진 앨범 불러오기
  const openAlbum = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, data => {
      console.log("album: ", data)

      const file = {
        uri: data.uri,
        name: "image.jpg",
        type: "image/jpg"
      }

      RNS3.put(file, s3_options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body);
      });
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

export default CameraScreen;
