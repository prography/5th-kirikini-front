import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

export default class LoginScreen extends Component{
    
    static navigationOptions = {
        header: null,
    };

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Login Screen</Text>
                    <Button
                        title="Go to Home"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                </View>                
            </View>
        );
    }
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