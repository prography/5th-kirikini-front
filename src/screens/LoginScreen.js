import React, { useState, useEffect } from 'react';
import {Platform, StyleSheet, Text, View, Image, YellowBox} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';
import NativeButton from 'apsl-react-native-button';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const TOKEN_EMPTY = 'token has not fetched';

const LoginScreen = props => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [token, setToken] = useState(TOKEN_EMPTY);

  useEffect(() => {
    autoLogin()
  })

  const autoLogin = () => {
    let access_token = null, refresh_token = null;
    AsyncStorage.multiGet(["jwt_access_token", "jwt_refresh_token"]).then(response => {
      access_token = response[0][1];
      refresh_token = response[1][1];
      
      if(access_token !== null)
      {
        axios.post('http://localhost:8000/auto_login', 
          {"jwt_access_token": access_token, "jwt_refresh_token": refresh_token},
          {
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
          })
        .then(response => {
          console.log("test: ", response['data'])
          if(response.status == 200)
            props.navigation.navigate('Home')
          else if(response.status == 201)
          {
            AsyncStorage.setItem("jwt_access_token", response['data'])
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
    logCallback('Login Start', setLoginLoading(true));

    KakaoLogins.login()
      .then(result => {
        setToken(result.accessToken);
        logCallback(
          `Login Finished:${JSON.stringify(result)}`,
          setLoginLoading(false),
        );

        axios.post('http://localhost:8000/kakao_login', 
          {"access_token": result.accessToken, "refresh_token": result.refreshToken},
          {
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
          })
          .then(response => response.data)
          .then(jwt => async () => {
              await AsyncStorage.multiSet([
                ['jwt_access_token', jwt['jwt_access_token']], 
                ['jwt_refresh_token', jwt['jwt_refresh_token']]
              ], () => autoLogin())
          })
          .catch(error => console.log('failed', error))
      })
      .catch(err => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          logCallback(`Login Cancelled:${err.message}`, setLoginLoading(false));
        } else {
          logCallback(
            `Login Failed:${err.code} ${err.message}`,
            setLoginLoading(false),
          );
        }
      });
  };

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