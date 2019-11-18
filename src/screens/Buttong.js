import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const Buttong = () => {
  const buttongroup = [
    { style: styles.mButton1, title: '집밥' },
    { style: styles.mButton2, title: '외식' },
    { style: styles.mButton3, title: '배달' },
    { style: styles.mButton4, title: '간편식' }
  ];

  const [btcolor, setBtcolor] = useState((backgroundColor = 'red'));
  let backgroundColor = 'red';

  onButtonPress = () => {
    if (setBtcolor(backgroundColor == 'blue')) {
      setBtcolor({ backgroundColor: 'red' });
    } else {
      setBtcolor({ backgroundColor: 'blue' });
    }
  };

  return (
    <View style={StyleSheet.container}>
      {buttongroup.map((item, index) => (
        <Button key={index} style={item.style} title={item.title} />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  mButton1: {
    width: '45%',
    height: '50%',
    backgroundColor: 'yellow',
    borderTopLeftRadius: 20,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  mButton2: {
    width: '45%',
    height: '50%',
    backgroundColor: 'yellow',
    borderTopRightRadius: 20,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  mButton3: {
    width: '45%',
    height: '50%',
    backgroundColor: 'yellow',
    borderBottomLeftRadius: 20,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  mButton4: {
    width: '45%',
    height: '50%',
    backgroundColor: 'yellow',
    borderBottomRightRadius: 20,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  }
});

export default Buttong;
