import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

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

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const navBarButtons = [
  {
    key: 0,
    text: '오늘',
    iconSelected: require('../img/navIconS0.png'),
    iconUnselected: require('../img/navIconU0.png'),
    // selected: true,
    nav: 'Home'
  },
  {
    key: 1,
    text: '채점',
    iconSelected: require('../img/navIconS1.png'),
    iconUnselected: require('../img/navIconU1.png'),
    // selected: false,
    nav: 'Rate'
  },
  {
    key: 2,
    text: '기록',
    iconSelected: require('../img/navIconS2.png'),
    iconUnselected: require('../img/navIconU2.png'),
    // selected: false,
    nav: 'Summary'
  },
  {
    key: 3,
    text: '설정',
    iconSelected: require('../img/navIconS3.png'),
    iconUnselected: require('../img/navIconU3.png'),
    // selected: false,
    nav: 'Settings'
  }
];

const NavBar = props => {
  const [selected, setSelected] = useState(null);
  const CreateNavBar = () =>
    navBarButtons.map(item => {
      return (
        <TouchableOpacity
          key={item.key}
          style={navBar.oneButton}
          onPress={() => {
            setSelected(item.key);
            console.log(selected);
            props.navigation.navigate(item.nav);
          }}
        >
          {selected !== item.key && (
            <>
              <Image
                style={{
                  height: 20,
                  width: 35,
                  resizeMode: 'contain',
                  marginBottom: 8
                }}
                source={item.iconUnselected}
              />
              <Text style={navBar.txtUnselected}>{item.text}</Text>
            </>
          )}

          {selected === item.key && (
            <>
              <Image
                style={{
                  height: 20,
                  width: 35,
                  resizeMode: 'contain',
                  marginBottom: 8
                }}
                source={item.iconSelected}
              />
              <Text style={navBar.txtSelected}>{item.text}</Text>
            </>
          )}
        </TouchableOpacity>
      );
    });

  return (
    <View style={navBar.container}>
      <View style={navBar.roundContainer}>
        <CreateNavBar navBarButtons={navBarButtons} />
        <TouchableOpacity />
      </View>
    </View>
  );
};

const navBar = StyleSheet.create({
  container: {
    backgroundColor: '#F2F9F2'
  },
  roundContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: deviceHeight / 9,
    width: deviceWidth,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6
  },
  oneButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
    // backgroundColor: 'red'
  },
  txtSelected: {
    color: yellow.a,
    fontWeight: '900',
    fontSize: 11.5,
    lineHeight: 12
  },
  txtUnselected: {
    color: gray.c,
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 12
  }
});

export default NavBar;

// onPress={() => props.navigation.navigate('Rate')}
{
  /* <Image style={capsuleSt.circlePhoto} source={props.imgSrc} /> */
}
// imgSrc={require('../img/foodExample1.jpeg')}
// onPress{() => { this.functionOne(); this.functionTwo();}}
