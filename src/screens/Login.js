import React, { useState, useEffect } from 'react';
import {
  Platform, StyleSheet, Text, 
  View, Image, YellowBox, 
  TextInput, Button, Alert
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import KakaoLogins from '@react-native-seoul/kakao-login';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {loginSuccess} from '../store/auth/action';
import { deviceHeight, EMAIL_URL, gray,KAKAO_URL, FB_URL, AUTO_URL, deviceWidth, kiriColor, yellow } from '../utils/consts'
import EStyleSheet from 'react-native-extended-stylesheet';

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const Login = props => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch()

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
    let access_token = null, refresh_token = null, email = null;
    AsyncStorage.multiGet(["@jwt_access_token", "@jwt_refresh_token", "@email"]).then(response => {
      access_token = response[0][1];
      refresh_token = response[1][1];
      email = response[2][1];
      
      if(access_token !== null)
      {
        const body = {
          "jwt_access_token": access_token, 
          "jwt_refresh_token": refresh_token, 
          "email": email
        }

        axios.post(AUTO_URL, body)
        .then(response => {
          if(response.status == 200)
          {
            dispatch(loginSuccess())
            props.navigation.navigate('Home')
          }
          else if(response.status == 201)
          {
            AsyncStorage.setItem("@jwt_access_token", response['data'])
            dispatch(loginSuccess())
            props.navigation.navigate('Home')
          }
          else if(response.status == 401)
          {
            Alert.alert("소셜로그인을 다시 진행해주세요!")
          }
          else console.log(response.data)
        })
        .catch(err => console.log(err))
      }
    })
  }

  const kakaoLogin = () => {
    KakaoLogins.login()
      .then(result => {
        console.log(result)
        setToken(result.accessToken);
      
        KakaoLogins.getProfile()
          .then(res => {
            setEmail(res.email)

            AsyncStorage.setItem('@email', res.email)
              .then(() => { 
                const body = {
                  "access_token": result.accessToken, 
                  "refresh_token": result.refreshToken, 
                }

                axios.post(KAKAO_URL, body)
                  .then(response => response.data)
                  .then(jwt => {
                    AsyncStorage.multiSet([
                      ['@jwt_access_token', jwt['jwt_access_token']], 
                      ['@jwt_refresh_token', jwt['jwt_refresh_token']],
                    ], () => autoLogin())
                  })
                  .catch(err => {
                    console.log('failed', err)
                  })
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
      })
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
        {"access_token": data.accessToken.toString()})
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
      
        <View style={{flexDirection: 'row', width: deviceWidth, justifyContent: 'space-between'}}>
        <Image
            style={styles.leaf}
            source={require('../img/leaf_left.png')}
          />
          <Image
            style={styles.leaf}
            source={require('../img/leaf_right.png')}
          />
          
        </View>
        <Text style={styles.txtKiri}>KIRIKINI</Text>
      
          <Image
            style={styles.kirini}
            source={require('../img/kirini1.png')}
          />
           
          
         
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
        <Text style={styles.textKini}>
          {error}
        </Text>
  
          <TouchableOpacity
              onPress={kakaoLogin}
              style={styles.kakaoButton}
            >
              <Image style={styles.kakaoLogo} source={require('../img/kakao_logo.png')}/>
              <Text style={styles.txtKakao}>카카오 로그인</Text>           
            </TouchableOpacity>
   
      

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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '40rem',
    alignItems: 'center',
    backgroundColor: kiriColor,
  },
  content: {
    
    
    alignItems: 'center',
    
  },
  txtKiri: {
    fontSize:'60rem',
    fontFamily: 'Digitalt',
    color: yellow.a,
    top: '-40rem'
  },
  textKini:{
    fontSize: '15rem',
    color: gray.d,
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Black'
  },
  button: {
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
  kakaoButton: {
    marginTop:'20rem',
    flexDirection: 'row',
    width: '250rem',
    backgroundColor: yellow.a,
    borderRadius: '30rem',
    height: deviceHeight / 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  kakaoLogo:{
    width:'20rem',
    height: '20rem',
    marginRight: '20rem',
    resizeMode: 'contain'
  },
  txtKakao:{
    fontSize: '14rem',
    color: gray.d,
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Bold'
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
    width: (deviceWidth * 1) / 2,
    height: deviceWidth / 4,
    resizeMode: 'contain',
  },
 leaf: {
    width: (deviceWidth * 1) / 3,
    height: deviceWidth / 5,
    resizeMode: 'contain',
  }
});

// todo: tab navigation
Login.navigationOptions = ({navigation}) => ({
  headerShown: false,
})

YellowBox.ignoreWarnings(['source.uri']);
export default connect(state => ({
  auth: state.auth
}))(Login);