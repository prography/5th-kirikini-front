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
  m: '#F2F9F2',
  a: '#EAEAEA',
  b: '#B7B7B7',
  c: '#898989',
  d: '#505151'
};
const mealColor = {
  a: '#C8BAE5',
  b: '#AFEAA2',
  c: '#AFCAF2',
  d: '#9CD8C8'
};

const yellow = {
  a: '#FCDB3A',
  b: '#F9CD15'
};

const kiriColor = '#F2F9F2';

let data = [
  {
    key: 0,
    mealTime: 6,
    mealScore: 7,
    mealType: 'a',
    giho: 'coffee',
    picURL: require('../img/foodExample1.jpeg')
  },
  {
    key: 1,
    mealTime: 12,
    mealScore: 3,
    mealType: 'b',
    giho: null,
    picURL: require('../img/foodExample2.jpeg')
  },
  {
    key: 2,
    mealTime: 20,
    mealScore: 7,
    mealType: 'c',
    giho: 'alcohol',
    picURL: require('../img/foodExample3.jpeg')
  },
  {
    key: 3,
    mealTime: 24,
    mealScore: 1,
    mealType: 'd',
    giho: null,
    picURL: require('../img/foodExample4.jpeg')
  }
];

const MENTS = {
  0: [
    '이렇게 먹을거면 차라리 굶는게 낫겠다',
    '너 그러다 쓰러져',
    '내가 물만 마셔도 너보다 건강하겠다',
  ],
  1: [
    '지금처럼 먹다가는 위장염, 간염 그리고 훅 가염..',
    '도대체 뭘 먹고 다니는거니?'
  ],
  2: [
    '이번 주만 벌써 몇 번째 고기야?(니 인생은 완전 고기서 고기야)',
    '너는 초록색 음식을 더 많이 먹어야 해! 어..? 거기 칭따오 내려놔'
  ],
  3: [
    '지금처럼 먹다가는 니 몸무게 앞자리가 달라지는 경험을 하게 될거야',
    '다른건 다 포기해도 건강은 포기하면 안돼!',
    '배달의 민족이 진짜 우리 민족은 아니야..',
    '더 먹을까 말까 할 때는 더 먹지 말자!',
    '하루는 보통 3끼라는거 알고 있지?'
  ],
  4: [
    '음식에 기름기랑 소금기 좀 빼자.. 나 웃음기 뺐다..',
    '이제 우리도 관리가 필요한 나이야',
    '탄수화물/단백질/채소는 1:1:2 비율이 좋대! 그런데 너는 왜 10:10:2인거니?'
  ],
  5: [
    '이미 너무 멀리 왔어',
    '조금만 더 분발하자',
    '조금만 더 건강하게 먹으면 끼리니가 칭찬해줄게!'
  ],
  6: [
    '짝짝짝! 술로부터 간을 구하셨습니다!',
    '오늘은 제법 무난하게 먹었네?'
  ],
  7: [
    '궁디팡팡',
    '건강도가 많이 올랐어!'
  ],
  8: [
    '모든 사람이 너처럼 먹으면 좋을텐데',
  ],
  9: [
    '완벽해',
    '건강하면 뭐든지 할 수 있어',
    '건강 식단 아주 칭찬해',
    'Health is wealth, 고로 너는 부자야!'
  ]
}

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
          console.log('home modal:' + modalVisible);
          var circleColor = mealColor.a;
          if (item.mealType === 0) {
            var circleColor = mealColor.a;
          }
          if (item.mealType === 1) {
            var circleColor = mealColor.b;
          }
          if (item.mealType === 2) {
            var circleColor = mealColor.c;
          }
          if (item.mealType === 3) {
            var circleColor = mealColor.d;
          }
          return (
            <Fragment key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{
                  position: 'absolute',
                  left:
                    (((deviceWidth * 5) / 3 - 338) / 20) * (item.created_at.slice(11, 13) - 6) -
                    (item.average_rate * 7 + 40) / 2 +
                    55,
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
  const [todayScore, setTodayScore] = useState(0);
  const [ment, setMent] = useState('');
  const [scoreCompare, setScoreCompare] = useState(0);
  const [name, setName] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('email')
      .then(result => setName(result))
  })
  
  const calculateTodayScore = () => {
    if(meals.length > 0)
    {
      let sum = 0;
      meals.map(meal => {
        sum += meal.average_rate
      })
      sum = (sum / meals.length).toFixed(1)
      
      setTodayScore(sum)
    }
    onChangeMent()
    onChangeScoreCompare()
  }

  const onChangeMent = () => {
    const _get_rand = (end) =>  Math.floor((Math.random() * (end+1)));

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
    // todo
  }

  const loadTodayMeals = () => {
    let access_token = null, refresh_token = null;
    AsyncStorage.multiGet(['jwt_access_token', 'jwt_refresh_token']).then(
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
              setMeals(response['data']);
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
                  {name}님의 현재 건강도는... {todayScore}점! {'\n'}
                  {ment}
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={circles.container}>
              <Image
                style={circles.sun}
                source={require('../img/iconSunBig.png')}
              />
              {
                meals && (
                  <HomeCircles meals={meals} />
                )
              }
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

export default connect(state => ({
  today: state.meal.meals.today
}))(HomeScreen);