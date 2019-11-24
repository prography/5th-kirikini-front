import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

const LoginScreen = (props) => {

    const [loading,setLoading] = useState(false)
    
      const renderLoading = () => {
        if (loading) {
          return (
            <ActivityIndicator size="large"  color="black" style={{
                position:'absolute', left:0, right:0, bottom:0, top:0 }}/>        
          )
        } else {
          return null
        }
      }
    
    const navigationOptions = {
        header: null,
    };
    return (
        <>
        <View>{renderLoading}</View>
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>Login Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => props.navigation.navigate('Home')}
                />
            </View>                
        </View>
        </>
    );    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    titleArea: {
        width: '100%',
        
        alignItems: 'center',
    },
})

export default LoginScreen