import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  selectedIndex,
  TextInput,
} from 'react-native';
import Buttong from './Buttong';
// import Option from './Components/Option';

const deviceWidth = Dimensions.get('window').width;

const kiri = {
  p: '#FF8603',
};

const gray = {
  a: 'white',
  b: '#B0B0B0', //더 연한 회색
  c: '#6F6F6F', //연한 회색
  d: '#404040', //진한 회색
};

const SelfEvaluate = () => {
  return (
    <SafeAreaView style={universalSt.container}>
      <View style={universalSt.header} />
      <View style={universalSt.content}>
        <View style={contentSt.cLeft}>
          <View style={contentSt.cAddMeal} />
          <View style={contentSt.cOption} />
          <View style={contentSt.cMenu}>
            {/* <MenuButton />
                        <MenuButton name="집밥" />
                        <MenuButton name="외식" />
                        <MenuButton name="배달" />
                        <MenuButton name="간편식" /> */}
            {/* <TouchableOpacity
            pressRetentionOffset
            style={contentSt.mButton1}>
              <Text style={contentSt.mText}>집ddddd밥</Text>
            </TouchableOpacity>
            <TouchableOpacity style={contentSt.mButton2}>
              <Text style={contentSt.mText}>외식</Text>
            </TouchableOpacity>
            <TouchableOpacity style={contentSt.mButton3}>
              <Text style={contentSt.mText}>배달</Text>
            </TouchableOpacity>
            <TouchableOpacity style={contentSt.mButton4}>
              <Text style={contentSt.mText}>간편식</Text>
            </TouchableOpacity> */}
            <Buttong />
          </View>
        </View>
        <View style={contentSt.cRight}>
          <View style={contentSt.cScore} />
        </View>
      </View>
      <View style={universalSt.footer}>
        <TouchableOpacity style={footerSt.fButton}>
          <Text style={footerSt.fText}>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//전체 화면 View 스타일
const universalSt = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flex: 1.5,
    width: '100%',
    height: '5%',
    backgroundColor: '#ff9a9a',
  },
  content: {
    flex: 4,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'black'
  },
  footer: {
    flex: 1,
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#1ad657',
  },
});

const contentSt = StyleSheet.create({
  cLeft: {
    flex: 2,
    flexDirection: 'column',
  },
  cRight: {
    flex: 1,
  },
  cAddMeal: {
    flex: 1,
    backgroundColor: 'red',
  },
  cOption: {
    flex: 0.5,
    backgroundColor: 'blue',
  },
  cMenu: {
    flex: 1,
    // height:'100%',
    // width:'100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  cContainer: {
    height: 100,
    width: 100,
  },
  mButton1: {
    width: '45%',
    height: '50%',
    backgroundColor: 'yellow',
    borderTopLeftRadius: 20,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  mButton2: {
    width: '45%',
    height: '50%',
    backgroundColor: 'yellow',
    borderTopRightRadius: 20,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  mButton3: {
    width: '45%',
    height: '50%',
    backgroundColor: 'yellow',
    borderBottomLeftRadius: 20,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  mButton4: {
    width: '45%',
    height: '50%',
    backgroundColor: 'yellow',
    borderBottomRightRadius: 20,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  mtext: {},
  cScore: {
    backgroundColor: 'gray',
    flex: 1,
  },
});

const footerSt = StyleSheet.create({
  fButton: {
    width: '95%',
    height: '70%',
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fText: {
    fontSize: 20,
    color: 'white',
  },
});

export default SelfEvaluate;
