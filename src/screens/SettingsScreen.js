import React from 'react';
import { Text, View } from 'react-native';
import NavBar from '../Components/NavBar';
const Settings = props => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#F2F9F2' }}>
        <Text>SettingsScreen will be updated after 11.30</Text>
      </View>
      <NavBar navigation={props.navigation} />
    </>
  );
};

export default Settings;
