import React, { useState, useEffect } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
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
    nav: 'Home'
  },
  {
    key: 1,
    text: '채점',
    iconSelected: require('../img/navIconS1.png'),
    iconUnselected: require('../img/navIconU1.png'),
    nav: 'Rate'
  },
  {
    key: 2,
    text: '기록',
    iconSelected: require('../img/navIconS2.png'),
    iconUnselected: require('../img/navIconU2.png'),
    nav: 'Summary'
  },
  {
    key: 3,
    text: '설정',
    iconSelected: require('../img/navIconS3.png'),
    iconUnselected: require('../img/navIconU3.png'),
    nav: 'Settings'
  }
];

const NavBar = props => {
  const [selected, setSelected] = useState(null);
  console.log('rendered:', selected);

  const selectedMenu = props.navigation.getParam('selectedMenu');
  useEffect(() => {
    if (props.default == true) {
      setSelected(0);
    } else {
      setSelected(selectedMenu);
    }
  });

  const CreateNavBar = () =>
    navBarButtons.map(item => {
      return (
        <TouchableOpacity
          key={item.key}
          style={navBar.oneButton}
          onPress={() => {
            console.log(selected);
            props.navigation.navigate(item.nav, { selectedMenu: item.key });
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
              <Text style={[navBar.txtUnselected, font.six]}>{item.text}</Text>
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
              <Text style={[navBar.txtSelected, font.eight]}>{item.text}</Text>
            </>
          )}
        </TouchableOpacity>
      );
    });

  return (
    <View style={navBar.roundContainer}>
      <CreateNavBar navBarButtons={navBarButtons} />
      <TouchableOpacity />
    </View>
  );
};
const font = EStyleSheet.create ({
  eight: Platform.OS === 'ios' ? {
    fontWeight: '800'
  } : {
   fontWeight: 'bold'
  },
  seven: Platform.OS === 'ios' ? {
    fontWeight: '700'
  } : {
   fontWeight: 'bold'
  },
  six:Platform.OS === 'ios' ? {
    fontWeight: '600'
  } : {
   fontWeight: 'normal'
  },
})

const navBar = EStyleSheet.create({
  roundContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: deviceHeight / 9,
    width: deviceWidth,
    paddingLeft: '7rem',
    paddingRight: '7rem',
    borderTopLeftRadius: '37rem',
    borderTopRightRadius:'37rem',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 40
  },
  oneButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '7rem'
    // backgroundColor: 'red'
  },
  txtSelected: {
    color: yellow.a,
    fontFamily: 'NotoSansCJKkr-Black',
    fontSize: '9.5rem',
    lineHeight: '12rem'
  },
  txtUnselected: {
    color: gray.c,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: '9rem',
    lineHeight: '12rem'
  }
});

export default NavBar;

// onPress={() => props.navigation.navigate('Rate')}
{
  /* <Image style={capsuleSt.circlePhoto} source={props.imgSrc} /> */
}
// imgSrc={require('../img/foodExample1.jpeg')}
// onPress{() => { this.functionOne(); this.functionTwo();}}
