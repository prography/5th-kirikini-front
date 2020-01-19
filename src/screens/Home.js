import React, { useState, useEffect, Fragment } from 'react';
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
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import { LOAD_MEALS_URL, LOAD_YESTERDAY_RATING_URL, deviceHeight, deviceWidth, gray, mealColor, yellow, kiriColor, MENTS } from '../utils/consts'

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
          width: (deviceWidth * 5) / 3 - 211
        }}
      />
      {
        props.meals && props.meals.map(item => {
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
                {(item.gihoType === 0) && 
                  (
                    <Image
                      style={{
                        zIndex: 20,
                        width: 25,
                        height: 25,
                        resizeMode: 'contain',
                        position: 'absolute',
                        left:
                          (((deviceWidth * 5) / 3 - 338) / 20) * (item.created_at.slice(11, 13) - 6) +
                          42.5
                      }}
                      source={require('../img/iconCupSmall.png')}
                    />
                  )
                }
                {(item.gihoType === 1) &&
                  (
                    <Image
                      style={{
                        zIndex: 20,
                        width: 25,
                        height: 25,
                        resizeMode: 'contain',
                        position: 'absolute',
                        left:
                          (((deviceWidth * 5) / 3 - 338) / 20) * (item.created_at.slice(11, 13) - 6) +
                          42.5
                      }}
                      source={require('../img/iconBeerSmall.png')}
                    />
                  )
                }
                
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
                    source={{uri: item.picURL}}
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
            </Fragment>
          );
        })
      }
    </View>      
  );
};

const HomeScreen = props => {
  const [meals, setMeals] = useState([]);
  const [todayScore, setTodayScore] = useState(null);
  const [ment, setMent] = useState('오늘 먹은 끼니를 등록해줘!');
  const [scoreCompare, setScoreCompare] = useState(null);
  const [name, setName] = useState('')
  const [mealTime, setMealTime] = useState()
  const [coffeeTime, setCoffeeTime] = useState()
  const [alcoholTime, setAlcoholTime] = useState()

  useEffect(() => {
    AsyncStorage.getItem('@email')
      .then(result => {
        const id = result.slice(0, result.indexOf('@'));
        setName(id)
      })
    loadTodayMeals()
  }, [])
  
  const calculateTodayScore = () => {
    console.log("meals:",meals)
    if(meals.length > 0)
    {
      console.log("meals.length: ", meals.length)
      let sum = 0;
      meals.map(meal => {
        sum += meal.average_rate
      })
      sum = (sum / meals.length).toFixed(1)
      
      setTodayScore(sum)
      onChangeScoreCompare()
      onChangeMent()
    }
  }

  const onChangeMent = () => {
    const _get_rand = (end) =>  Math.floor((Math.random() * (end)));

    let rand, idx;

    if(todayScore < 1)
      idx = 0
    else if(todayScore < 2)
      idx = 1
    else if(todayScore < 3)
      idx = 2
    else if(todayScore < 4)
      idx = 3
    else if(todayScore < 5)
      idx = 4
    else if(todayScore < 6)
      idx = 5
    else if(todayScore < 7)
      idx = 6
    else if(todayScore < 8)
      idx = 7
    else if(todayScore < 9)
      idx = 8
    else
      idx = 9

    rand = _get_rand(MENTS[idx].length)
    setMent(MENTS[idx][rand])
  }

  const onChangeScoreCompare = () => {
    let access_token = null, refresh_token = null;
    AsyncStorage.multiGet(['@jwt_access_token', '@jwt_refresh_token']).then(
      response => {
        access_token = response[0][1];
        refresh_token = response[1][1];

        if (access_token !== null) {
          const headers = {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded' // json으로 못 넘겨주겠음..
          };

          axios
            .get(LOAD_YESTERDAY_RATING_URL, { headers })
            .then(response => {
              setScoreCompare((response['data']['sum'] / response['data']['count']).toFixed(1))
            })
            .catch(err => console.log(err));
        }
      }
    );
  }

  const loadTodayMeals = () => {
    console.log("loadTodayMeals()")
    let access_token = null, refresh_token = null;
    AsyncStorage.multiGet(['@jwt_access_token', '@jwt_refresh_token']).then(
      response => {
        access_token = response[0][1];
        refresh_token = response[1][1];

        if (access_token !== null) {
          const headers = {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded' // json으로 못 넘겨주겠음..
          };

          axios
            .get(LOAD_MEALS_URL, { headers })
            .then(response => {
              setMeals(response['data'])
              calculateTodayScore()
            })
            .catch(err => console.log(err));
        }
      }
    );
  };

  const today = (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <NavigationEvents onWillFocus={() => {
        loadTodayMeals()
        calculateTodayScore()
      }} />
      <View style={styles.container}>
      <View style={styles.topMargin}/>
        <View style={styles.topHalf}>
          <View style={balloonSt.container}>
            <View style={balloonSt.balloon}>
              <View style={balloonSt.topBar}>
                <Text style={styles.txtBigTitle}>오늘 건강도</Text>
                <Text style={balloonText.todayScore}>{!todayScore ? '-' : todayScore}</Text>
                {/* <Text style={balloonText.todayScore}>9.3</Text> */}
              </View>
              {/* todo: <View style={balloonSt.scoreCompareArea}>
                <Text style={balloonText.scoreCompare}>{!todayScore ? '-' : ((todayScore-scoreCompare) > 0 ? '▲' : '▼' (todayScore - scoreCompare))}</Text>
              </View>*/}
              <View style={balloonSt.lastMealTimeContainer}>
                <View style={balloonSt.lastMealIconWrapper}>
                  <Text style={balloonText.lastMealTime}>
                    🍽 밥 먹은 지{'\n'}
                    🍺 음주한 지{'\n'}
                    ☕️ 커피 마신 지{'\n'}
                  </Text>
                </View>
                <View style={balloonSt.lastMealTimeWrapper}>
                  <Text style={balloonText.lastMealTime}>
                    {mealTime ? mealTime : '2시간 8분'} 
                    {'\n'}
                    {alcoholTime ? alcoholTime : '234시간'}
                    {'\n'}
                    {coffeeTime ? coffeeTime : '31시간'} 
                    {'\n'}
                  </Text>
                </View>
              </View>
              <View style={balloonSt.feedbackArea}>
                <Text style={balloonText.feedback}>
                  {todayScore == null ? (`${name}님,`) : (`${name}님의 오늘 건강도는 ${todayScore}!`)}
                  {`\n${ment}`}
                </Text>
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
              {
                meals && (
                  <HomeCircles meals={meals} />
                )
              }
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
    flexDirection: 'column',
    backgroundColor: kiriColor
  },
  topMargin:{
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
    fontFamily: 'NotoSansCJKkr-Bold',
    lineHeight: '30rem',
   
  }
});

// 하얀 말풍선 속 Text 스타일
const balloonText = EStyleSheet.create({
  title: {
    fontSize: '10rem',
    lineHeight: 35,
    fontWeight: '700',
    color: gray.d
  },
  todayScore: {
    fontSize: '30rem',
    lineHeight: '40rem',
    //  fontFamily:'FredokaOne-Regular',
    // fontFamily:'Quicksand-Bold',
    fontFamily:'Rubik-Bold',
    color: yellow.b
  },
  scoreCompare: {
    fontSize: 12,
    color: gray.b
  },
  lastMealTime: {
    fontSize: '11rem',
    color: gray.c,
    textAlign: 'right',
    fontFamily: 'NotoSansCJKkr-Bold'
  },
  feedback: {
    fontSize: '14rem',
    color: gray.d,
    textAlign: 'right',
    fontFamily: 'NotoSansCJKkr-Medium'
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
    alignItems: 'flex-end'
  },
  lastMealTimeContainer: {
    flex: 1.2,
    flexDirection: 'row',
    paddingTop: '12rem',
    
  },
  lastMealIconWrapper: {
    flex: 3,
    justifyContent: 'center'
  },
  lastMealTimeWrapper: {
    // flex: 1,
    justifyContent: 'center',
    paddingLeft: '10rem',
    
  },
  feedbackArea: {
    flex: 1.7,
    justifyContent: 'center',
    alignItems: 'flex-end',
    
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
    top:'-9rem',
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
    width: (deviceWidth * 5) / 3,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
    // backgroundColor: 'pink'
  },
  circlesContainer: {
    width: (deviceWidth * 5) / 3 - 228,
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
HomeScreen.navigationOptions = ({navigation}) => ({
  headerShown: false,
})

export default connect(state => ({
  today: state.meal.meals.today
}))(HomeScreen);