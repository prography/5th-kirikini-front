import React, { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const Time = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    
    return (
      <View style={styles.container}>
        <Button
            style={styles.time} 
            title="끼니 시간 설정" 
            onPress={showDatePicker} 
        />
        <DateTimePicker
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleConfirm}
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