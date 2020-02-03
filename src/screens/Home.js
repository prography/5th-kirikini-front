import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Platform
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import {
  LOAD_MEALS_URL,
  LOAD_YESTERDAY_RATING_URL,
  LOAD_SINCE_MEAL_INFO_URL,
  deviceHeight,
  deviceWidth,
  gray,
  mealColor,
  yellow,
  kiriColor,
  MENTS
} from '../utils/consts';

const HomeCircles = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={circles.circlesContainer}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          borderBottomColor: 'white',
          borderBottomWidth: 3,
          width: '100%'
        }}
      />
      {props.meals &&
        props.meals.map(item => {
          var circleColor = mealColor.a;
          if (item.mealType === 0) {
            circleColor = mealColor.a;
          }
          if (item.mealType === 1) {
            circleColor = mealColor.b;
          }
          if (item.mealType === 2) {
            circleColor = mealColor.c;
          }
          if (item.mealType === 3) {
            circleColor = mealColor.d;
          }

          return (
            <Fragment key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{
                  backgroundColor: circleColor,
                  borderRadius: 110,
                  width: item.average_rate * 7 + 40,
                  height: item.average_rate * 7 + 40
                }}
              />
              {item.gihoType === 0 && (
                <Image
                  style={{
                    zIndex: 20,
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    position: 'absolute',
                    left: -item.average_rate * 3.5 - 32
                  }}
                  source={require('../img/iconCupSmall.png')}
                />
              )}
              {item.gihoType === 1 && (
                <Image
                  style={{
                    zIndex: 20,
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    position: 'absolute',
                    left: -item.average_rate * 3.5 - 32
                  }}
                  source={require('../img/iconBeerSmall.png')}
                />
              )}

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
                  <View style={modal.view}>
                    <Image source={{ uri: item.picURL }} style={modal.img} />
                  </View>
                </TouchableOpacity>
              </Modal>
            </Fragment>
          );
        })}
    </View>
  );
};

const HomeScreen = props => {
  const [meals, setMeals] = useState([]);
  const [todayScore, setTodayScore] = useState(null);
  const [ment, setMent] = useState('오늘 먹은 끼니를 등록해줘!');
  const [scoreCompare, setScoreCompare] = useState(null);
  const [name, setName] = useState('');
  const [mealSince, setMealSince] = useState('-');
  const [coffeeSince, setCoffeeSince] = useState('-');
  const [drinkSince, setDrinkSince] = useState('-');

  useEffect(() => {
    AsyncStorage.getItem('@email').then(result => {
      const id = result.slice(0, result.indexOf('@'));
      setName(id);
      loadTodayMeals();
      loadSinceMealInfo();
    });
  }, []);

  const calculateTodayScore = () => {
    if (meals.length > 0) {
      let sum = 0;
      meals.map(meal => {
        sum += meal.average_rate;
      });
      sum = (sum / meals.length).toFixed(1);

      setTodayScore(sum);
      onChangeScoreCompare();
      onChangeMent();
    }
  };

  const onChangeMent = () => {
    const _get_rand = end => Math.floor(Math.random() * end);

    let rand, idx;

    if (todayScore < 1) idx = 0;
    else if (todayScore < 2) idx = 1;
    else if (todayScore < 3) idx = 2;
    else if (todayScore < 4) idx = 3;
    else if (todayScore < 5) idx = 4;
    else if (todayScore < 6) idx = 5;
    else if (todayScore < 7) idx = 6;
    else if (todayScore < 8) idx = 7;
    else if (todayScore < 9) idx = 8;
    else idx = 9;

    rand = _get_rand(MENTS[idx].length);
    setMent(MENTS[idx][rand]);
  };

  const onChangeScoreCompare = () => {
    let access_token = null,
      refresh_token = null;
    AsyncStorage.multiGet(['@jwt_access_token', '@jwt_refresh_token']).then(
      response => {
        access_token = response[0][1];
        refresh_token = response[1][1];

        if (access_token !== null) {
          const headers = {
            Authorization: `Bearer ${access_token}`
          };

          axios
            .get(LOAD_YESTERDAY_RATING_URL, { headers })
            .then(response => {
              setScoreCompare(response['data']);
            })
            .catch(err => console.log(err));
        }
      }
    );
  };

  const loadTodayMeals = () => {
    let access_token = null,
      refresh_token = null;
    AsyncStorage.multiGet(['@jwt_access_token', '@jwt_refresh_token']).then(
      response => {
        access_token = response[0][1];
        refresh_token = response[1][1];

        if (access_token !== null) {
          const headers = {
            Authorization: `Bearer ${access_token}`
          };

          axios
            .get(LOAD_MEALS_URL, { headers })
            .then(response => {
              setMeals(response['data']);
              calculateTodayScore();
            })
            .catch(err => console.log(err));
        }
      }
    );
  };

  const loadSinceMealInfo = () => {
    const _calculateSinceTime = seconds => {
      if (seconds < 3600) {
        // 1시간 이내
        const minutes = parseInt(seconds / 60);
        return `${minutes}분`;
      } else if (seconds < 86400) {
        // 24시간 이내
        const hours = parseInt(seconds / 3600);
        const minutes = ((seconds % 3600) / 60).toFixed(0);
        return `${hours}시간 ${minutes}분`;
      } else {
        // 그 외는 '일'로 표시
        const days = parseInt(seconds / 86400);
        return `${days}일`;
      }
    };

    let access_token = null,
      refresh_token = null;
    AsyncStorage.multiGet(['@jwt_access_token', '@jwt_refresh_token']).then(
      response => {
        access_token = response[0][1];
        refresh_token = response[1][1];

        if (access_token !== null) {
          const headers = {
            Authorization: `Bearer ${access_token}`
          };

          axios
            .get(LOAD_SINCE_MEAL_INFO_URL, { headers })
            .then(response => {
              if (response.status == 200) {
                const since_data = response.data;

                if (since_data['meal'] > 0) {
                  const since_text = _calculateSinceTime(since_data['meal']);
                  setMealSince(since_text);
                }
                if (since_data['drink'] > 0) {
                  const since_text = _calculateSinceTime(since_data['drink']);
                  setDrinkSince(since_text);
                }
                if (since_data['coffee'] > 0) {
                  const since_text = _calculateSinceTime(since_data['coffee']);
                  setCoffeeSince(since_text);
                }
              }
            })
            .catch(err => console.log(err));
        }
      }
    );
  };

  const today = (
    <View style={{ backgroundColor: kiriColor, flex: 1 }}>
      <NavigationEvents
        onWillFocus={() => {
          console.log('onWillFocus');
          loadTodayMeals();
          loadSinceMealInfo();
          calculateTodayScore();
        }}
      />
      <View style={styles.container}>
        <View style={styles.topMargin} />
        <View style={styles.topHalf}>
          <View style={balloonSt.container}>
            <View style={balloonSt.balloon}>
              <View style={balloonSt.topBar}>
                <Text style={[styles.txtBigTitle, font.eight]}>
                  오늘 건강도
                </Text>
                <Text style={balloonText.todayScore}>
                  {!todayScore ? '-' : todayScore}
                </Text>
              </View>
              <View style={balloonSt.scoreCompareArea}>
                <Text style={balloonText.scoreCompareTri}>
                  {!(todayScore && scoreCompare)
                    ? '-'
                    : todayScore - scoreCompare > 0
                    ? '▲ '
                    : '▼ '}
                </Text>
                <Text style={balloonText.scoreCompare}>
                  {!(todayScore && scoreCompare)
                    ? null
                    : Math.round(Math.abs(todayScore - scoreCompare) * 10) / 10}
                </Text>
              </View>
              <View style={balloonSt.lastMealTimeContainer}>
                <View style={balloonSt.lastMealIconWrapper}>
                  <Text style={[balloonText.lastMealTime, font.seven]}>
                    {mealSince === '-'
                      ? '아직 입력된 끼니가 없어요'
                      : '🍽 밥 먹은 지'}
                  </Text>
                  <Text style={[balloonText.lastMealTime, font.seven]}>
                    {drinkSince === '-'
                      ? '아직 입력된 음주가 없어요'
                      : '🍺 음주한 지'}
                  </Text>
                  <Text style={[balloonText.lastMealTime, font.seven]}>
                    {coffeeSince === '-'
                      ? '아직 입력된 커피가 없어요'
                      : '☕️ 커피 마신 지'}
                  </Text>
                </View>
                <View style={balloonSt.lastMealTimeWrapper}>
                  <Text
                    style={[
                      mealSince === '-'
                        ? balloonText.noMeal
                        : balloonText.lastMealTime,
                      font.seven
                    ]}
                  >
                    {mealSince}
                  </Text>
                  <Text
                    style={[
                      drinkSince === '-'
                        ? balloonText.noMeal
                        : balloonText.lastMealTime,
                      font.seven
                    ]}
                  >
                    {drinkSince}
                  </Text>
                  <Text
                    style={[
                      coffeeSince === '-'
                        ? balloonText.noMeal
                        : balloonText.lastMealTime,
                      font.seven
                    ]}
                  >
                    {coffeeSince}
                  </Text>
                </View>
              </View>
              <View style={balloonSt.feedbackArea}>
                <Text style={[balloonText.feedback, font.six]}>
                  {todayScore == null
                    ? `${name}님,`
                    : `${name}님의 오늘 건강도는 ${todayScore}!`}
                </Text>
                <Text
                  style={[balloonText.feedback, font.six]}
                >{`${ment}`}</Text>
              </View>
            </View>
            <View style={balloonSt.tailContainer}>
              <View style={balloonSt.tailWhiteArea} />
              <View style={balloonSt.tailKiriColorArea} />

              <TouchableOpacity
                style={balloonSt.kiriniContainer}
                onPress={() => props.navigation.navigate('Upload')}
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={circles.container}>
              {meals && <HomeCircles meals={meals} />}
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
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topMargin: {
    flex: 0.5,
    backgroundColor: kiriColor
  },
  topHalf: {
    flex: 5,
    flexDirection: 'row'
  },
  bottomHalf: {
    flex: 2
  },
  txtBigTitle: {
    fontSize: '23rem',
    color: gray.d,
    lineHeight: '30rem'
  }
});

const modal = EStyleSheet.create({
  view: {
    flex: 0.416,
    top: deviceHeight / 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: '70rem',
    borderBottomRightRadius: '70rem'
  },
  img: {
    backgroundColor: 'white',
    height: deviceWidth - 54,
    width: (deviceWidth * 75) / 100 - 20,
    borderTopRightRadius: '60rem',
    borderBottomLeftRadius: '60rem',
    resizeMode: 'cover',
    transform: [{ rotate: '90deg' }]
  }
});

const font = EStyleSheet.create({
  eight:
    Platform.OS === 'ios'
      ? {
          fontWeight: '800'
        }
      : {
          fontWeight: 'bold'
        },
  seven:
    Platform.OS === 'ios'
      ? {
          fontWeight: '700'
        }
      : {
          fontWeight: 'bold'
        },
  six:
    Platform.OS === 'ios'
      ? {
          fontWeight: '600'
        }
      : {
          fontWeight: 'normal'
        }
});

// 하얀 말풍선 속 Text 스타일
const balloonText = EStyleSheet.create({
  // title: {
  //   fontSize: '3rem',
  //   lineHeight: '12rem',
  //   fontWeight: 'normal',
  //   color: gray.d
  // },
  todayScore: {
    fontSize: '25rem',
    lineHeight: '30rem',
    // fontFamily:'Kanit-ExtraBold',
    fontFamily: 'JosefinSans-Bold',
    // fontFamily: 'Digitalt',
    color: yellow.b
  },
  scoreCompareTri: {
    fontSize: '10rem',
    color: gray.b,
    fontFamily: 'JosefinSans-Bold'
  },
  scoreCompare: {
    fontSize: '15rem',
    color: gray.b,
    fontFamily: 'JosefinSans-Bold'
  },
  lastMealTime: {
    fontSize: '13.5rem',
    color: gray.c,
    textAlign: 'right',
    fontFamily: 'NotoSansCJKkr-Bold',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  noMeal: {
    fontSize: '13.5rem',
    color: 'white',
    textAlign: 'right',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  feedback: {
    fontSize: '15rem',
    color: gray.d,
    textAlign: 'right',
    lineHeight: '27rem'
  }
});

// 하얀 말풍선 속 View 스타일
const balloonSt = EStyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'column'
  },
  balloon: {
    flex: 2,
    flexDirection: 'column',
    width: deviceWidth,
    padding: deviceWidth / 10,
    borderTopLeftRadius: '70rem',
    borderBottomRightRadius: '70rem',
    backgroundColor: 'white'
  },
  topBar: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scoreCompareArea: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  lastMealTimeContainer: {
    flex: 1.25,
    flexDirection: 'row',
    paddingTop: '12rem'
  },
  lastMealIconWrapper: {
    flex: 3,
    justifyContent: 'space-around'
  },
  lastMealTimeWrapper: {
    // flex: 1,
    justifyContent: 'space-around',
    paddingLeft: '10rem',
    alignItems: 'flex-start'
  },
  feedbackArea: {
    flex: 1.7,
    // boxSizing: 'border-box',
    // paddingBottom: '5rem',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
    // backgroundColor: 'red',
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
    borderTopLeftRadius: '70rem',
    backgroundColor: kiriColor
  },
  kiriniContainer: {
    position: 'absolute',
    right: deviceWidth / 10,
    top: '-9rem',
    width: (deviceWidth * 3) / 10,
    height: deviceWidth / 3,
    alignSelf: 'center'
  },
  kirini: {
    position: 'absolute',
    marginLeft: 40,
    width: (deviceWidth * 3) / 10,
    height: deviceWidth / 3,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});

const circles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
    // backgroundColor: 'pink'
  },
  circlesContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
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

// todo: tab navigation
HomeScreen.navigationOptions = ({ navigation }) => ({
  headerShown: false
});

export default connect(state => ({
  today: state.meal.meals.today
}))(HomeScreen);
