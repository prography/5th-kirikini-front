import ImagePicker from 'react-native-image-picker';

// 사진 앨범 불러오기
const OpenAlbum = () => {
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  ImagePicker.launchImageLibrary(options, response => {});
};

export default OpenAlbum;
