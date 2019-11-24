import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';



const FBLogin = () => {
    return (
        <View style={styles.container}> 
          <LoginButton
          style={styles.FBLoginButton}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      console.log(data.accessToken.toString())
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log("logout.")}/>
        </View>
      );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:'center',

    },
    FBLoginButton: {
    height:50,
    width:216,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#3b5998'
    }
});

export default FBLogin;
