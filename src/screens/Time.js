import React, { Component,useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const Time = () => {
    const [visible,setVisible] = useState(false);
    const showDateTimePicker = () => {
        setVisible(!visible)
    }
    const hideDateTimePicker = () => {
        setVisible(visible)
    }
    const handleDatePicked = () => {
        console.log("A date has been picked: ");
    hideDateTimePicker();
    }
    
    return (
      <View style={styles.container}>
        <Button
        style={styles.time} 
        title="Show DateTimePicker" onPress={showDateTimePicker} />
        <DateTimePicker
          isVisible={visible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
          mode={'datetime'}
          datePickerModeAndroid={'spinner'}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:'center',
    },
    time:{
        height:50,
        width:216,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#3b5998'
    }
});

export default Time;