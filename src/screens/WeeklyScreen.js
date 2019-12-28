import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableHighlight,
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
  m: '#F2F9F2',
  a: '#EAEAEA',
  b: '#B7B7B7',
  c: '#898989',
  d: '#505151'
};

const yellow = {
  a: '#FCDB3A',
  b: '#F9CD15'
};

const meal = {
  a: '#C8BAE5',
  b: '#AFEAA2',
  c: '#AFCAF2',
  d: '#9CD8C8'
};

const Weekly = props => {
    return(
        <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <View style={topBox.container}>
          <Text style={styles.txtBigTitle}>기록</Text>
        </View>
        <View style={styles.scrollview}>
          <ScrollView>
            <View style={bar.topMargin} />

            <View style={bar.bottomMargin} />
          </ScrollView>
        </View>
      </View>
      <NavBar navigation={props.navigation} />
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F9F2'
    },
    txtBigTitle: {
      fontSize: 27,
      fontWeight: '700',
      color: gray.d
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
      paddingRight: 17,
      paddingLeft: 17,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 7,
      elevation: 6
    }
  });
  const barToggled = StyleSheet.create({
    contentContainer: {
      flexDirection: 'column',
      height: 459,
      flex: 1
      // backgroundColor: gray.a
    }
  });
  
  const wLUntoggled = StyleSheet.create({
    sunMoonContainer: {
      position: 'absolute',
      alignSelf: 'flex-end',
      top: -10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 20,
      width: 310
      // backgroundColor: gray.a
    }
  });
  const wLToggled = StyleSheet.create({
    sunMoonContainer: {
      position: 'absolute',
      alignSelf: 'flex-end',
      top: -10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 20,
      width: 310
      // backgroundColor: gray.a
    },
    oneDay: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 5,
      marginTop: 5
      // backgroundColor: 'yellow'
    },
    day: {
      flex: 1,
      justifyContent: 'center'
      // backgroundColor: gray.d
    },
    txtDay: {
      fontSize: 14,
      fontWeight: '600',
      color: gray.c
    },
    circleContainer: {
      flex: 8,
      flexDirection: 'row',
      alignItems: 'center'
      // backgroundColor: gray.b
    }
  });
  
  const bar = StyleSheet.create({
    topMargin: {
      height: 40
    },
    bottomMargin: {
      height: 100
    },
    container: {
      // height: 108,
      marginTop: 20,
      padding: 17,
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
  
  const barUntoggled = StyleSheet.create({
    contentContainer: {
      height: 74,
      // backgroundColor: yellow.a,
      alignItems: 'center'
    },
    txtTitle: {
      fontWeight: '600',
      fontSize: 15,
      lineHeight: 16,
      color: gray.d
    },
    content: {
      marginTop: 5,
      marginBottom: 10,
      height: 67,
      width: '100%'
      // backgroundColor: gray.a
    }
  });

export default Weekly;
