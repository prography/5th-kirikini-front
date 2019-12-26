import React, { useState, useEffect } from 'react';
import {
  Platform, StyleSheet, Text, 
  View, Image, YellowBox, 
  TextInput, Button, Dimensions
} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import CookieManager from 'react-native-cookies';
import axios from 'axios';
import { EMAIL_URL, KAKAO_URL, FB_URL, AUTO_URL } from '../utils/consts'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const kiriColor = '#F2F9F2';

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const LoginScreen = props => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    autoLogin()
  }, [])

  const onChangeEmail = (_email) => {
    setEmail(_email)
  }

  const onChangePassword = (_password) => {
    setPassword(_password)
  }

  const emailLogin = () => {
    console.log(email, password)
    const data = {
      email,
      password
    }
    axios.post(EMAIL_URL, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then(response => {
      console.log("test: ", response['data'])
      if(response.status == 200)
        props.navigation.navigate('Home')
      else if(response.status == 201)
      {
        AsyncStorage.setItem("@jwt_access_token", response['data'])
        props.navigation.navigate('Home')
      }
      else
      {
        console.log(response.data)
      }
    })
    .catch(err => console.log(err))
  }

  const autoLogin = () => {
    let access_token = null, refresh_token = null;
    AsyncStorage.multiGet(["@jwt_access_token", "@jwt_refresh_token"]).then(response => {
      access_token = response[0][1];
      refresh_token = response[1][1];
      console.log("autoLogin access_token: ", access_token)
      
      if(access_token !== null)
      {
        axios.post(AUTO_URL, {"jwt_access_token": access_token, "jwt_refresh_token": refresh_token},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }})
        .then(response => {
          if(response.status == 200)
            props.navigation.navigate('Home')
          else if(response.status == 201)
          {
            AsyncStorage.setItem("@jwt_access_token", response['data'])
            props.navigation.navigate('Home')
          }
          else
          {
            console.log(response.data)
          }
        })
        .catch(err => console.log(err))
      }
    })
  }

  const kakaoLogin = () => {
    KakaoLogins.login()
      .then(result => {
        console.log("result", result)
        setToken(result.accessToken);
        
        KakaoLogins.getProfile()
          .then(res => {
            setEmail(res.email)
            
            AsyncStorage.setItem('@email', res.email)
              .then(() => {
                axios.post(KAKAO_URL, 
                  {"access_token": result.accessToken, "refresh_token": result.refreshToken},
                  {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }
                  })
                  .then(response => response.data)
                  .then(jwt => {
                    AsyncStorage.multiSet([
                      ['@jwt_access_token', jwt['jwt_access_token']], 
                      ['@jwt_refresh_token', jwt['jwt_refresh_token']],
                    ], () => autoLogin())
                  })
                  .catch(error => console.log('failed', error))
              })
          })
          .catch(err => {
            logCallback(
              `Get Profile Failed:${err.code} ${err.message}`,
            );
          });
      })
      .catch(err => console.log(err));
  };

  const fbLogin = (result) => {
    AccessToken.getCurrentAccessToken().then(data => {
      console.log(data.accessToken.toString())
      console.log("fb data: ", data)
      
      const profileRequestParams = {
        fields: {
            string: 'email'
        }
      }

      const profileRequestConfig = {
        httpMethod: 'GET',
        version: 'v2.5',
        parameters: profileRequestParams,
        accessToken: token.toString()
      }

      const profileRequest = new GraphRequest(
        '/me',
        profileRequestConfig,
        (error, result) => {
          if (error) {
            console.log(error)
          } else {
            console.log("email: ", result)
          }
        },
      )

      new GraphRequestManager().addRequest(profileRequest).start();
            
      axios.post(FB_URL, 
        {"access_token": data.accessToken.toString()},
        {
          headers: {'Content-type': 'application/x-www-form-urlencoded'}
        })
        .then(response => response.data)
        .then(jwt => {
          AsyncStorage.multiSet([
            ['@jwt_access_token', jwt['jwt_access_token']], 
            ['@jwt_refresh_token', jwt['jwt_refresh_token']]
          ], () => autoLogin())
        })
        .catch(error => console.log('failed', error))
    })

    LoginManager.logInWithPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
          <Image
            style={styles.kirini}
            source={require('../img/kirini2.png')}
          />
          <Text style={styles.txtKiri}>KiriKini</Text>
          <Text style={styles.textKini}>식단관리서비스</Text>
      </View>
        {/*<Text> // todo: 추후 추가
          이메일
        </Text>
        <TextInput
          style={{ width: 150, height: 80, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => onChangeEmail(text)}
          value={email}
        />
        <Text>
          비밀번호
        </Text>
        <TextInput
          style={{ width: 150, height: 80, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => onChangePassword(text)}
          value={password}
        />
        <TouchableOpacity
          onPress={emailLogin}
        >
        <Button
          title="로그인"
          onPress={emailLogin}
        />
        </TouchableOpacity>*/}

        <View style={styles.button}>
          <TouchableOpacity
            onPress={kakaoLogin}
          >
            <Image
              source={require('../img/kakao_button.png')}
            />
          </TouchableOpacity>
        </View>

        {/*<LoginButton
          publishPermissions={["email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                fbLogin(result)
              }
            }
          }
        onLogoutFinished={() => console.log("logout.")}/>*/}
        {/*<TouchableOpacity // 추후 추가
          onPress={fbLogin}
          title="페이스북 로그인"
          style={styles.btnFbLogin} >
            <Image
              source={require('../img/facebook_logo.jpg')}
              style={{width:30, height:30, margin:18}}
            />          
          <Text style={styles.txtFbLogin}>페이스북 로그인</Text>
        </TouchableOpacity>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 0 : 24,
    paddingTop: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: kiriColor,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtKiri: {
    fontSize:40
  },
  textKini:{
    fontSize:10
  },
  button: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop:30
  },
  btnKakaoLogin: {
    height: 48,
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#F8E71C',
    borderRadius: 0,
    borderWidth: 0,
  },
  txtKakaoLogin: {
    fontSize: 16,
    color: '#3d3d3d',
  },
  btnFbLogin: {
    height: 49,
    width: 300,
    backgroundColor: '#3A589E',
    borderRadius: 5,
    justifyContent:'flex-start',
    alignItems: 'center',
    flexDirection:'row',
    marginTop:7,
  },
  txtFbLogin: {
    fontSize: 16,
    color: 'white',
    paddingLeft:50
  },
  kirini: {
    marginTop:180,
    width: (deviceWidth * 4) / 7,
    height: deviceWidth / 3,
    resizeMode: 'contain',
    flex:1,
    display: 'flex'
  }
});

// todo: tab navigation
LoginScreen.navigationOptions = ({navigation}) => ({
  headerShown: false,
})

YellowBox.ignoreWarnings(['source.uri']);
export default LoginScreen