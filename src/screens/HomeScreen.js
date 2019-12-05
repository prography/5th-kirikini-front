import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NavBar from '../Components/NavBar';
import { useTheme } from 'react-navigation';
import axios from 'axios';

const LOAD_MEALS_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/today'

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

const todayScore = 5.7;
const kiriColor = '#F2F9F2';

const HomeScreen = props => {
  const [meals, setMeals] = useState([]);

  const loadTodayMeals = () => {
    let access_token = null, refresh_token = null;
    AsyncStorage.multiGet(["jwt_access_token", "jwt_refresh_token"]).then(response => {
      access_token = response[0][1];
      refresh_token = response[1][1];
      
      if(access_token !== null)
      {
        axios.post(LOAD_MEALS_URL,
          {"jwt_access_token": access_token, "jwt_refresh_token": refresh_token},
          {
            headers: {'Content-type': 'application/x-www-form-urlencoded'}
          })
        .then(response => {
          console.log("meals: ", response['data'])
          
          // let data = response['data']
          // setMeals(data)
        })
        .catch(err => console.log(err))
      }
    })
  }

  useEffect(() => {
    loadTodayMeals()
  })

  const today = (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
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

// 좌측 상단 네비게이션 바의 View 스타일
const navSt = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: deviceWidth / 10
  },
  navButton: {
    width: deviceWidth / 6,
    height: deviceWidth / 9,
    marginBottom: deviceWidth / 10,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 15,
    backgroundColor: gray.a,
    opacity: 0.3
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

// 하단 바... + 버튼이 있는 곳의 View와 Text 스타일
const bottomBarSt = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  addMealButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  addMealButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth / 6,
    height: deviceWidth / 6,
    borderStyle: 'solid',
    borderColor: gray.a,
    borderWidth: 3,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: gray.a,
    opacity: 1
  },
  addMealButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: kiriColor
  },
  buttonTailWhiteArea: {
    width: 30,
    height: 30,
    backgroundColor: gray.a
  },
  buttonTailKiricolorArea: {
    position: 'absolute',
    left: deviceWidth / 6,
    width: 40,
    height: 55,
    borderBottomLeftRadius: 50,
    backgroundColor: kiriColor
  }
});

export default connect(state => ({
  today: state.meal.meals.today
}))(HomeScreen);

// {this.props.meals && this.props.meals.map(meal => {
//   (
//     <View>
//       <Image
//         style={{width: 200, height: 200}} // todo: 이미지 사이즈 조절
//         source={{uri: meal.file.uri}}
//       />
//       <Text>
//         식사 1
//       </Text>
//     </View>
//   )
// })}