import React, {useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import Modal from "react-native-modal";
import NavBar from '../Components/NavBar';
import { logout } from '../store/auth/action';
import { PRIVACY_URL } from '../utils/consts'

const Settings = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    props.navigation.navigate('Login')
  }

  console.log(modalVisible)

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1}}>
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F2F9F2', justifyContent: 'space-around'}}>
        <Modal
          style={{margin: 80}}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
        >
          <WebView
            source={{uri: `${PRIVACY_URL}`}}
            style={{flex:1}}
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
          onPress={() => setModalVisible(!modalVisible)}
          style={{alignSelf: 'center'}}
        >
          <Text
            style={{textAlign: 'center', fontSize: 18}}
          >
            개인정보처리방침
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
