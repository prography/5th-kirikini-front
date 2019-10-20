import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

export default class HomeScreen extends Component{
    render(){
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapContent}>
                    <Text style={styles.content}>HomeScreen</Text>
                </View>
                <View style={styles.wrapContent}>
                    <Text style={styles.content}>sdsdssdsdsd</Text>
                </View>
                <View style={styles.wrapContent}>
                    <Text style={styles.content}>sdsdssdsdsd</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapContent: {
        
    },
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#46c3ad",
    }
})