import React, { useState, useEffect } from 'react';
import {Platform, StyleSheet, Text, View, Image, YellowBox} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';
import NativeButton from 'apsl-react-native-button';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const KAKAO_URL = "http://localhost:8000/kakao_login"
const FB_URL = "http://localhost:8000/facebook_login"
const AUTO_URL = "http://localhost:8000/auto_login"
// const KAKAO_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/kakao_login"
// const FB_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/facebook_login"
// const AUTO_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/auto_login"

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const LoginScreen = props => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    autoLogin()
  })

  const autoLogin = () => {
    let access_token = null, refresh_token = null;
    AsyncStorage.multiGet(["jwt_access_token", "jwt_refresh_token"]).then(response => {
      access_token = response[0][1];
      refresh_token = response[1][1];
      console.log("autoLogin access_token: ", access_token)
      
      if(access_token !== null)
      {
        axios.post(AUTO_URL, 
          {"jwt_access_token": access_token, "jwt_refresh_token": refresh_token},
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(response => {
          console.log("test: ", response['data'])
          if(response.status == 200)
            props.navigation.navigate('Home')
          else if(response.status == 201)
          {
            AsyncStorage.setItem("jwt_access_token", response['data'])
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
        setToken(result.accessToken);
        
        KakaoLogins.getProfile()
          .then(res => {
            setEmail(res.email)
            
            AsyncStorage.setItem('email', res.email)
              .then(() => {
                axios.post(KAKAO_URL, 
                  {"access_token": result.accessToken, "refresh_token": result.refreshToken},
                  {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  })
                  .then(response => response.data)
                  .then(jwt => {
                    AsyncStorage.multiSet([
                      ['jwt_access_token', jwt['jwt_access_token']], 
                      ['jwt_refresh_token', jwt['jwt_refresh_token']],
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
      .catch(err => {
        console.log(err)
      });
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
            ['jwt_access_token', jwt['jwt_access_token']], 
            ['jwt_refresh_token', jwt['jwt_refresh_token']]
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
        <TouchableOpacity
          onPress={kakaoLogin}
        >
          <Image
            source={require('../img/kakao_button.png')}
          />
        </TouchableOpacity>

        <LoginButton
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
          onLogoutFinished={() => console.log("logout.")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 0 : 24,
    paddingTop: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: 'white',
  },
  profile: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: 'black',
  },
  content: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  token: {
    width: 200,
    fontSize: 12,
    padding: 5,
    borderRadius: 8,
    marginVertical: 20,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
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
});

YellowBox.ignoreWarnings(['source.uri']);
export default LoginScreen