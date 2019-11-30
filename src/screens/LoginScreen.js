import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View, Image, YellowBox} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';
import NativeButton from 'apsl-react-native-button';

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

export default function LoginScreen() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [token, setToken] = useState(TOKEN_EMPTY);

  const kakaoLogin = () => {
    logCallback('Login Start', setLoginLoading(true));

    KakaoLogins.login()
      .then(result => {
        setToken(result.accessToken);
        logCallback(
          `Login Finished:${JSON.stringify(result)}`,
          setLoginLoading(false),
        );
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
}

YellowBox.ignoreWarnings(['source.uri']);