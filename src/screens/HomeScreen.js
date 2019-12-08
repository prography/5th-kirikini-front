import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';
import NavBar from '../Components/NavBar';

// const LOAD_MEALS_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/today'
const LOAD_MEALS_URL = 'http://localhost:8000/meal/today';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const gray = {
  a: '#EAEAEA',
  b: '#B7B7B7',
  c: '#898989',
  d: '#505151'
};
const meal = {
  a: '#C8BAE5',
  b: '#AFEAA2',
  c: '#AFCAF2',
  d: '#9CD8C8'
};

const yellow = {
  a: '#FCDB3A',
  b: '#F9CD15'
};

const todayScore = 5.7;
const kiriColor = '#F2F9F2';

let data = [
  {
    key: 0,
    mealTime: 7,
    mealScore: 10,
    mealType: 'a',
    picURL: require('../img/foodExample1.jpeg')
  },
  {
    key: 1,
    mealTime: 12,
    mealScore: 3,
    mealType: 'b',
    picURL: require('../img/foodExample2.jpeg')
  },
  {
    key: 2,
    mealTime: 20,
    mealScore: 7,
    mealType: 'c',
    picURL: require('../img/foodExample3.jpeg')
  },
  {
    key: 3,
    mealTime: 24,
    mealScore: 1,
    mealType: 'd',
    picURL: require('../img/foodExample4.jpeg')
  }
];

const HomeCircles = props => {
  const CreateHomeCircle = () =>
    data.map(item => {
      const [modalVisible, setModalVisible] = useState(false);
      console.log('home modal:' + modalVisible);
      var circleColor = meal.a;
      if (item.mealType === 'a') {
        var circleColor = meal.a;
      }
      if (item.mealType === 'b') {
        var circleColor = meal.b;
      }
      if (item.mealType === 'c') {
        var circleColor = meal.c;
      }
      if (item.mealType === 'd') {
        var circleColor = meal.d;
      }
      return (
        <>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              position: 'absolute',
              left:
                (((deviceWidth * 5) / 3 - 338) / 20) * (item.mealTime - 7) -
                (item.mealScore * 7 + 40) / 2 +
                55,
              backgroundColor: circleColor,
              borderRadius: 110,
              width: item.mealScore * 7 + 40,
              height: item.mealScore * 7 + 40
            }}
          />

          <Modal
            animation="fade"
            transparent={true}
            visible={modalVisible}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{ width: deviceWidth, height: deviceHeight }}
            >
              <Image
                source={item.picURL}
                style={{
                  top: deviceHeight / 2 - 150,
                  alignSelf: 'center',
                  backgroundColor: 'pink',
                  width: 300,
                  height: 300,
                  borderRadius: 50
                }}
              />
            </TouchableOpacity>
          </Modal>
        </>
      );
    });

  return (
    <View style={circles.circlesContainer}>
      <CreateHomeCircle data={data} />
    </View>
  );
};

const HomeScreen = props => {
  const [meals, setMeals] = useState([]);
  console.log(meals);
  if (meals) console.log('meals exist');

  // const loadTodayMeals = () => {
  //   let access_token = null,
  //     refresh_token = null;
  //   AsyncStorage.multiGet(['jwt_access_token', 'jwt_refresh_token']).then(
  //     response => {
  //       access_token = response[0][1];
  //       refresh_token = response[1][1];

  //       if (access_token !== null) {
  //         const headers = {
  //           Authorization: `Bearer ${access_token}`,
  //           'Content-type': 'application/x-www-form-urlencoded' // json으로 못 넘겨주겠음..
  //         };

  //         axios
  //           .get(LOAD_MEALS_URL, { headers })
  //           .then(response => {
  //             setMeals(response['data']);
  //           })
  //           .catch(err => console.log(err));
  //       }
  //     }
  //   );
  // };

  const today = (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      {/* <NavigationEvents onWillFocus={() => loadTodayMeals()} /> */}
      <View style={styles.container}>
        <View style={styles.topHalf}>
          <View style={balloonSt.container}>
            <View style={balloonSt.balloon}>
              <View style={balloonSt.topBar}>
                <Text style={styles.txtBigTitle}>오늘 건강도</Text>
                <Text style={balloonText.todayScore}>{todayScore}</Text>
              </View>
              <View style={balloonSt.scoreCompareArea}>
                <Text style={balloonText.scoreCompare}>▲ 1.2</Text>
              </View>
              <View style={balloonSt.lastMealTimeContainer}>
                <View style={balloonSt.lastMealIconWrapper}>
                  <Text style={balloonText.lastMealTime}>
                    🍽 :{'\n'}
                    🍺 :{'\n'}
                    ☕️ :{'\n'}
                  </Text>
                </View>
                <View style={balloonSt.lastMealTimeWrapper}>
                  <Text style={balloonText.lastMealTime}>
                    1시간 58분
                    {'\n'}
                    254시간
                    {'\n'}
                    31시간
                    {'\n'}
                  </Text>
                </View>
              </View>
              <View style={balloonSt.feedbackArea}>
                <Text style={balloonText.feedback}>
                  zwon님의 현재 건강도는... {todayScore}
                  점! {'\n'}
                  나보다 잘 먹네... {'\n'}
                  대체 뭘 먹은거야?
                </Text>
              </View>
            </View>
            <View style={balloonSt.tailContainer}>
              <View style={balloonSt.tailWhiteArea} />
              <View style={balloonSt.tailKiriColorArea} />

              <TouchableOpacity
                style={balloonSt.kiriniContainer}
                onPress={() => props.navigation.navigate('Upload2')}
              >
                <Image
                  style={balloonSt.kirini}
                  source={require('../img/kirini2.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomHalf}>
          <ScrollView horizontal={true}>
            <View style={circles.container}>
              <Image
                style={circles.sun}
                source={require('../img/iconSunBig.png')}
              />
              <HomeCircles />
              <Image
                style={circles.moon}
                source={require('../img/iconMoonBig.png')}
              />
            </View>
          </ScrollView>
        </View>
      </View>

      <NavBar navigation={props.navigation} default={true} />
    </View>
  );
  return today;
};

// 공통적으로 쓰일? View 스타일 (화면 분할 등)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: kiriColor
  },
  topHalf: {
    flex: 2.8,
    flexDirection: 'row'
  },
  bottomHalf: {
    flex: 1
  },
  txtBigTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: gray.d
  }
});

// 하얀 말풍선 속 Text 스타일
const balloonText = StyleSheet.create({
  title: {
    fontSize: 27,
    lineHeight: 35,
    fontWeight: '700',
    color: gray.d
  },
  todayScore: {
    fontSize: 35,
    lineHeight: 35,
    fontWeight: '700',
    color: yellow.b
  },
  scoreCompare: {
    fontSize: 12,
    color: gray.b
  },
  lastMealTime: {
    fontSize: 13,
    lineHeight: 25,
    fontWeight: '500',
    color: gray.c,
    textAlign: 'right'
  },
  feedback: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '600',
    color: gray.d,
    textAlign: 'right'
  }
});

// 하얀 말풍선 속 View 스타일
const balloonSt = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'column'
  },
  balloon: {
    flex: 2,
    flexDirection: 'column',
    width: deviceWidth,
    padding: deviceWidth / 10,
    borderTopLeftRadius: 70,
    borderBottomRightRadius: 70,
    backgroundColor: 'white'
  },
  topBar: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scoreCompareArea: {
    alignItems: 'flex-end'
  },
  lastMealTimeContainer: {
    flex: 1.5,
    flexDirection: 'row',
    paddingTop: 7
  },
  lastMealIconWrapper: {
    flex: 7,
    justifyContent: 'center'
  },
  lastMealTimeWrapper: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 6
  },
  feedbackArea: {
    flex: 1.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  tailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: deviceWidth / 10
  },
  tailWhiteArea: {
    width: deviceWidth / 3,
    height: deviceWidth / 5,
    backgroundColor: 'white'
  },
  tailKiriColorArea: {
    position: 'absolute',
    width: deviceWidth / 3,
    height: deviceWidth / 3,
    borderTopLeftRadius: 100,
    backgroundColor: kiriColor
  },
  kiriniContainer: {
    position: 'absolute',
    right: 40,
    width: (deviceWidth * 4) / 10,
    height: deviceWidth / 4,
    alignSelf: 'center'
  },
  kirini: {
    position: 'absolute',
    marginLeft: 40,
    width: (deviceWidth * 4) / 10,
    height: deviceWidth / 4,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});

const circles = StyleSheet.create({
  container: {
    width: (deviceWidth * 5) / 3,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
    // backgroundColor: 'pink'
  },
  circlesContainer: {
    width: (deviceWidth * 5) / 3 - 228,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  sun: {
    width: 80,
    height: 80,
    marginLeft: 17,
    marginRight: 17
  },
  moon: {
    width: 80,
    height: 80,

    marginLeft: 17,
    marginRight: 17
  }
});

export default connect(state => ({
  today: state.meal.meals.today
}))(HomeScreen);
