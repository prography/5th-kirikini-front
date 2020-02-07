import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import { mealRate } from '../store/meal/action';
import {
  RATE_MEAL_URL,
  deviceWidth,
  gray,
  yellow,
  meal,
  kiriColor,
  deviceHeight,
  weight,
  home
} from '../utils/consts';

const Rate = props => {
  const [mealScore, setMealScore] = useState(5);
  const [mealToRate, setMealToRate] = useState([]);
  let user_name, user_meal_time;
  console.log('mealsToRate:', mealToRate[0]);

  const dispatch = useDispatch();
  if (mealToRate.length > 0) {
    user_meal_time =
      Number(mealToRate[0]['created_at'].slice(11, 13)) < 12
        ? '오전 ' + mealToRate[0]['created_at'].slice(11, 13) + '시'
        : '오후 ' +
          Number(mealToRate[0]['created_at'].slice(11, 13) - 12) +
          '시';
    user_name = mealToRate[0]['picURL'].slice(
      mealToRate[0]['picURL'].indexOf('%2F') + 3,
      mealToRate[0]['picURL'].indexOf('%40')
    );
  }

  useEffect(() => {
    loadRateMeal();
  }, []);

  const onValueChange = mealScore => {
    setMealScore(mealScore);
  };

  const loadRateMeal = () => {
    let access_token = null,
      refresh_token = null;
    AsyncStorage.multiGet(['@jwt_access_token', '@jwt_refresh_token']).then(
      response => {
        access_token = response[0][1];
        refresh_token = response[1][1];
        console.log('access_token: ', access_token);

        if (access_token !== null) {
          const headers = {
            Authorization: `Bearer ${access_token}`
          };

          axios
            .get(RATE_MEAL_URL, { headers })
            .then(response => {
              if (response.status == 200)
                // dispatch(mealRate(response.data)) // todo: 어떤거는 props로 어떤거는 state로 어떤거는 async로 관리할 것인가?
                setMealToRate(response.data);
            })
            .catch(err => console.log(err));
        }
      }
    );
  };

  const rateMeal = () => {
    let access_token = null,
      refresh_token = null;
    AsyncStorage.multiGet(['@jwt_access_token', '@jwt_refresh_token']).then(
      response => {
        access_token = response[0][1];
        refresh_token = response[1][1];
        console.log('access_token: ', access_token);

        if (access_token !== null && mealToRate.length > 0) {
          const headers = {
            Authorization: `Bearer ${access_token}`
          };

          const data = {
            meal: mealToRate[0]['id'],
            rating: mealScore
          };

          axios
            .post(RATE_MEAL_URL, data, { headers })
            .then(response => {
              if (response.status == 200) {
                let copiedMealToRate = [];
                Object.assign(copiedMealToRate, mealToRate);
                copiedMealToRate.shift();
                setMealToRate(copiedMealToRate);
              }
            })
            .catch(err => console.log(err));
        }
      }
    );
  };

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topMargin} />
        <View style={styles.titleHeader}>
          <Text style={styles.txtBigTitle}>건강도 채점</Text>
          <TouchableOpacity style={styles.infoCircle}>
            <Text style={styles.txtInfo}>?</Text>
          </TouchableOpacity>
        </View>
        <View style={mainImg.screen}>
          {mealToRate.length == 0 ? (
            <Fragment>
              <Image
                style={mainImg.noMealKirini}
                source={require('../img/kirini5.png')}
              />
              <Text style={mainImg.noMealAlert}>
                채점할 끼니가 없습니다. {'\n'}
                다른 유저의 끼니 등록을 기다려주세요!
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <Image
                style={mainImg.img} // todo: 이미지 사이즈 조절
                source={{ uri: mealToRate[0]['picURL'] }}
              />
            </Fragment>
          )}
        </View>
        {mealToRate.length == 0 ? null : (
          <Text style={slider.txtScoreWhose}>
            {user_name}님이 {user_meal_time}에 먹은 끼니
          </Text>
        )}
        {mealToRate.length == 0 ? null : (
          <View style={slider.container}>
            <View style={slider.scoreInfoContainer}>
              <Text style={slider.txtScoreJum}>점</Text>
            </View>
            <Text style={slider.txtScore}>{mealScore}</Text>
            <Slider
              step={1}
              value={5}
              thumbTintColor={yellow.a}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor={yellow.a}
              maximumTrackTintColor={gray.b}
              onValueChange={onValueChange}
            />
            <TouchableOpacity onPress={rateMeal} style={slider.button}>
              <Text style={slider.txtSubmit}>다음 끼니 채점하기 👉</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <NavBar navigation={props.navigation} />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '16rem',
    paddingRight: '16rem',
    backgroundColor: '#F2F9F2'
  },
  topMargin: {
    height: home.margin
  },
  titleHeader: {
    marginBottom: '15rem',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  txtBigTitle: {
    fontSize: '23rem',
    color: gray.d,
    lineHeight: '32rem',
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: weight.eight
  },
  infoCircle: {
    width: '20rem',
    height: '20rem',
    marginLeft: '5rem',
    backgroundColor: yellow.a,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtInfo: {
    fontFamily: 'Digitalt',
    color: 'white',
    fontSize: '18rem',
    lineHeight: '18rem'
  }
});

const slider = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // marginTop: 120
    // backgroundColor: gray.a,
    paddingBottom: '20rem',
    position: 'relative',
    zIndex: 100
  },
  scoreInfoContainer: {
    flexDirection: 'column',
    // backgroundColor: gray.b,
    // justifyContent: 'center',
    top: '35rem',
    alignItems: 'center'
  },
  txtScoreWhose: {
    fontSize: '14rem',
    lineHeight: '18rem',
    marginTop: '18rem',
    color: gray.c,
    bottom: '2rem',
    zIndex: 20,
    position: 'relative',
    textAlign: 'center',
    fontWeight: weight.seven
    // backgroundColor: 'red'
  },
  txtScoreJum: {
    fontSize: '20rem',
    color: yellow.b,
    left: '36rem',
    lineHeight: '40rem',
    bottom: '-2rem',
    fontWeight: weight.eight
  },
  txtScore: {
    marginBottom: '10rem',
    fontSize: '40rem',
    fontFamily: 'JosefinSans-Bold',
    color: yellow.b,
    textAlign: 'center',
    lineHeight: '40rem'
  },
  button: {
    marginTop: '20rem',
    width: '50%',
    height: deviceWidth / 6.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: '30rem'
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 7 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
    // elevation: 20
  },
  txtSubmit: {
    textAlign: 'center',
    fontSize: '14rem',
    color: gray.c,
    fontWeight: weight.seven
  }
});

const mainImg = EStyleSheet.create({
  noMealKirini: {
    width: '100rem',
    height: '70rem',
    resizeMode: 'contain'
  },
  noMealAlert: {
    fontSize: '13rem',
    lineHeight: '18rem',
    fontWeight: weight.eight,
    color: gray.c,
    textAlign: 'center'
  },
  screen: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: (deviceWidth * 70) / 100,

    // borderTopLeftRadius: '70rem',
    // borderBottomRightRadius: '70rem',
    // borderColor: 'white',
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // height: (deviceWidth * 70) / 100,
    height: (deviceHeight / 100) * 38,
    borderTopLeftRadius: '70rem',
    borderBottomRightRadius: '70rem',
    borderColor: 'white',
    borderWidth: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    position: 'relative',
    zIndex: 1
  },
  whoseKini: {
    top: 10,
    fontSize: '11rem',
    color: gray.c,
    textAlign: 'center',
    fontWeight: weight.seven
  },
  img: {
    top: 0,
    // height: deviceWidth - 54,
    // width: deviceHeight /2.7,
    // width: (deviceWidth * 70) / 100 - 20,
    // borderTopRightRadius: '60rem',
    // borderBottomLeftRadius: '60rem',
    // resizeMode: 'cover',
    // transform: [{ rotate: '90deg' }]
    // 이미지가 안 돌아가기 시작한다면 아래 코드 사용...
    width: '100%',
    // height: deviceWidth * 75 /100 -20,
    height: (deviceHeight / 100) * 38 - 20,
    borderTopLeftRadius: '60rem',
    borderBottomRightRadius: '60rem',
    resizeMode: 'cover'
  }
});

// todo: tab navigation
Rate.navigationOptions = ({ navigation }) => ({
  headerShown: false
});

export default connect(state => ({
  meals: state.meal.meals
}))(Rate);
