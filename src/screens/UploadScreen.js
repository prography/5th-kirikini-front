import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const MealUpload = props => {
  return (
    <>
      <Text>Upload Screen by Seekeryang before 11.30</Text>

      <TouchableOpacity onPress={() => props.navigation.navigate('Camera')}>
        <View>
          <Text>👉 CameraScreen will be called here</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default MealUpload;
