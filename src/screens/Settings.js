import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import NavBar from '../Components/NavBar';
import { logout } from '../store/auth/action';
import { PRIVACY_URL } from '../utils/consts';
import EStyleSheet from 'react-native-extended-stylesheet';
import KakaoLogins from '@react-native-seoul/kakao-login';
import {
  RATE_MEAL_URL,
  deviceWidth,
  gray,
  yellow,
  meal,
  kiriColor,
  deviceHeight,
  weight,
  home
} from '../utils/consts';

// todo: 자동로그인 on/off
const Settings = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        '@jwt_access_token',
        '@jwt_refresh_token',
        '@email'
      ]);
      await KakaoLogins.logout();

      dispatch(logout());
      props.navigation.navigate('Login');
    } catch (e) {
      Alert.alert(e.toString());
    }
  };

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topMargin} />
        <View style={styles.titleHeader}>
          <Text style={styles.txtBigTitle}>설정</Text>
        </View>
        <View style={content.container}>
          <Modal
            style={{ margin: 80 }}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => setModalVisible(false)}
            onBackButtonPress={() => setModalVisible(false)}
          >
            <WebView source={{ uri: `${PRIVACY_URL}` }} style={{ flex: 1 }} />
          </Modal>

          <TouchableOpacity
            onPress={() => handleLogout()}
            style={content.button}
          >
            <Text style={content.txt}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={content.button}
          >
            <Text style={content.txt}>개인정보처리방침</Text>
          </TouchableOpacity>
        </View>
      </View>

      <NavBar navigation={props.navigation} />
    </View>
  );
};

// todo: tab navigation
Settings.navigationOptions = ({ navigation }) => ({
  headerShown: false
});

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '16rem',
    paddingRight: '16rem',
    backgroundColor: '#F2F9F2'
  },
  topMargin: {
    height: home.margin,
    backgroundColor: kiriColor
  },
  titleHeader: {
    marginBottom: '15rem'
  },
  txtBigTitle: {
    fontSize: '23rem',
    color: gray.d,
    lineHeight: '30rem',
    fontWeight: weight.eight,
    alignSelf: 'center'
  }
});

const content = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  button: {
    marginTop: '20rem',
    width: '50%',
    height: deviceWidth / 6.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: '30rem'
  },
  txt: {
    textAlign: 'center',
    fontSize: '16rem',
    color: gray.d,
    fontWeight: weight.seven
  }
});

export default connect(state => ({
  auth: state.auth
}))(Settings);
