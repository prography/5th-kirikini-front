import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Image
} from 'react-native';
import NavBar from '../Components/NavBar';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const gray = {
  a: '#EAEAEA',
  b: '#B7B7B7',
  c: '#898989',
  d: '#505151'
};

const yellow = {
  a: '#FCDB3A',
  b: '#F9CD15'
};

const Summary2 = props => {
  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <View style={topBox.container}></View>
        <View style={styles.scrollview}>
          <ScrollView>
            <View style={barUntoggled.topMargin} />
            <View style={barUntoggled.container}></View>
            <View style={barUntoggled.container}></View>
            <View style={barUntoggled.container}></View>
            <View style={barUntoggled.container}></View>
            <View style={barUntoggled.bottomMargin} />
          </ScrollView>
        </View>
      </View>
      <NavBar navigation={props.navigation} default={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F2F9F2'
  },
  scrollview: {
    height: 600,
    top: -40
  }
});

const topBox = StyleSheet.create({
  container: {
    // position: 'absolute',
    // left: 0,
    zIndex: 10,
    height: 100,
    width: deviceWidth,
    backgroundColor: '#F2F9F2',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingRight: 10,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 6
  }
});

const barUntoggled = StyleSheet.create({
  topMargin: {
    height: 40
  },
  bottomMargin: {
    height: 100
  },
  container: {
    height: 120,
    marginTop: 20,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1
  }
});
export default Summary2;
