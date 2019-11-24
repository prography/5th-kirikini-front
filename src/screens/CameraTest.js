import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

const CameraTest = props => {
  // 사진 앨범 불러오기
  const openAlbum = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    // Open Image Library:
    ImagePicker.launchImageLibrary(options, response => {
      // Same code as in above section!
    });
  };

  const takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const navigationOptions = {
    header: null
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>
          Camera Test... 원래는 홈버튼이 맞습니다
        </Text>
        <Button title="앨범" onPress={() => openAlbum()} />
      </View>

      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          width: '100%'
        }}
      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => takePicture()} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  titleArea: {
    width: '100%',

    alignItems: 'center'
  }
});

export default CameraTest;
