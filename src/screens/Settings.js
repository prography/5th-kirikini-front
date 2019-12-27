import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import NavBar from '../Components/NavBar';
import { logout } from '../store/auth/action';

const Settings = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    props.navigation.navigate('Login')
  }

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1}}>
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F2F9F2', justifyContent: 'space-around'}}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <WebView
            source={{uri: 'http://localhost:8000/privacy'}}
            style={{marginLeft: 50, marginRight: 50, marginTop: 120, marginBottom: 120}}
            scalesPageToFit={false}
            useWebKit={false}
          />
        </Modal>

        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{alignSelf: 'center'}}
        >
          <Text
            style={{textAlign: 'center', fontSize: 18}}
          >
            로그아웃
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log(1)}
          style={{alignSelf: 'center'}}
        >
          <Text
            style={{textAlign: 'center', fontSize: 18}}
          >
            알림 설정
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log(1)}
          style={{alignSelf: 'center'}}
        >
          <Text
            style={{textAlign: 'center', fontSize: 18}}
          >
            앱 버전
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log(1)}
          style={{alignSelf: 'center'}}
        >
          <Text
            style={{textAlign: 'center', fontSize: 18}}
          >
            문의하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{alignSelf: 'center'}}
        >
          <Text
            style={{textAlign: 'center', fontSize: 18}}
          >
            개인정보처리방침
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log(1)}
          style={{alignSelf: 'center'}}
        >
          <Text
            style={{textAlign: 'center', fontSize: 18}}
          >
            오픈소스 라이센스
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log(1)}
          style={{alignSelf: 'center'}}
        >
          <Text
            style={{textAlign: 'center', fontSize: 18}}
          >
            정보 동의 설정
          </Text>
        </TouchableOpacity>
      </View>

      <NavBar navigation={props.navigation} />
    </View>
  );
};

// todo: tab navigation
Settings.navigationOptions = ({navigation}) => ({
  headerShown: false,
})

export default connect(state => ({
  auth: state.auth
}))(Settings);
