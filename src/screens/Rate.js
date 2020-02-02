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
import { RATE_MEAL_URL, deviceWidth, gray, yellow, meal, kiriColor, deviceHeight } from '../utils/consts'


const Rate = props => {
  const [mealScore, setMealScore] = useState(5);
  const [mealToRate, setMealToRate] = useState([]);
  // const { meals } = props
  let user_name, user_meal_date;
  console.log("mealsToRate:", mealToRate[0])

  const dispatch = useDispatch()

  if(mealToRate.length > 0) {
    user_name = mealToRate[0]['picURL'].slice(mealToRate[0]['picURL'].indexOf('uploads/')+8, mealToRate[0]['picURL'].indexOf('@'))
    user_meal_date = mealToRate[0]['created_at'].slice(0, 10)
  }

  useEffect(() => {
    loadRateMeal()
  }, [])

  const onValueChange = mealScore => {
    setMealScore(mealScore);
  };

  const loadRateMeal = () => {
    let access_token = null, refresh_token = null;
      AsyncStorage.multiGet(["@jwt_access_token", "@jwt_refresh_token"]).then(response => {
        access_token = response[0][1];
        refresh_token = response[1][1];
        console.log("access_token: ", access_token)

        if(access_token !== null)
        {
          const headers = {
            'Authorization': `Bearer ${access_token}`,
          };

          axios.get(RATE_MEAL_URL, {headers})
            .then(response => {
              if(response.status == 200)
                // dispatch(mealRate(response.data)) // todo: 어떤거는 props로 어떤거는 state로 어떤거는 async로 관리할 것인가?
                setMealToRate(response.data)
            })
            .catch(err => console.log(err))
        }
      })
  }

  const rateMeal = () => {
    let access_token = null, refresh_token = null;
      AsyncStorage.multiGet(["@jwt_access_token", "@jwt_refresh_token"]).then(response => {
        access_token = response[0][1];
        refresh_token = response[1][1];
        console.log("access_token: ", access_token)

        if(access_token !== null && mealToRate.length > 0)
        {
          const headers = {
            'Authorization': `Bearer ${access_token}`,
          };

          const data = {
            meal: mealToRate[0]['id'],
            rating: mealScore
          }

          axios.post(RATE_MEAL_URL, data, {headers})
            .then(response => {
              if(response.status == 200)
              {
                let copiedMealToRate = []
                Object.assign(copiedMealToRate, mealToRate);
                copiedMealToRate.shift()
                setMealToRate(copiedMealToRate)
              }
            })
            .catch(err => console.log(err))
        }
      })
  }

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        { Platform.OS === 'ios'
          ?
          (<View style={styles.topMargin}/>)
          :
          null
        }
        <View style={styles.titleHeader}>
          <Text style={styles.txtBigTitle}>끼니 채점</Text>
        </View>
          <View style={mainImg.screen}>
            {
              mealToRate.length == 0 
              ?
              (<>
              <Image
                style={mainImg.noMealKirini}
                source={require('../img/kirini5.png')}
              />
                <Text
                  style={mainImg.noMealAlert}
                >
                  채점할 끼니가 없습니다. {'\n'}
                  다른 유저의 끼니 등록을 기다려주세요!
                </Text>
              </>  
              )
              :
              (
                <Fragment>
                  <Image
                    style={mainImg.img} // todo: 이미지 사이즈 조절
                    source={{uri: mealToRate[0]['picURL']}}
                  />
                  <Text style={mainImg.whoseKini}>
                    {user_name}님이 {user_meal_date}에 먹은 끼니입니다
                  </Text>
                </Fragment>
              )
            }
        </View>
        <View style={slider.container}>
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
          <TouchableOpacity
            onPress={rateMeal}
            style={slider.button}
          >
            <Text
              style={slider.txtSubmit}
            >
              다음 끼니 채점하기 👉
            </Text>
          </TouchableOpacity>
        </View>

        
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
  topMargin:{
    height: '30rem',
    backgroundColor: kiriColor
  },
  titleHeader: {
    marginBottom: '15rem',
    
  },
  txtBigTitle: {
    fontSize: '23rem',
    color: gray.d,
    fontFamily: 'NotoSansCJKkr-Bold',
    lineHeight: '30rem',
    
  }
});

const slider = EStyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-end',
    // marginTop: 120
    // backgroundColor: gray.a,
    paddingBottom: '20rem',
  },
  txtScore: {
    marginBottom: '10rem',
    fontSize: '40rem',
    // fontFamily:'FredokaOne-Regular',
    // fontFamily:'Quicksand-Bold',
    fontFamily:'Rubik-Bold',
    color: yellow.b,
    textAlign: 'center'
  },
  button:{
    marginTop: '20rem',
    width: '50%',
    height: deviceHeight / 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
   borderRadius: '30rem',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 7 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
    // elevation: 20
  },
  txtSubmit: {
    textAlign: 'center',
    fontSize: '13rem', 
    fontFamily:'NotoSansCJKkr-Bold',
    color: gray.c
  }
});

const mainImg = EStyleSheet.create({
  noMealKirini:{
    width: '100rem', 
    height: '70rem',
    resizeMode: 'contain'
  },
  noMealAlert: {
    fontSize: '11rem',
    color: gray.c,
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Bold'
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceWidth * 75 /100,
    borderTopLeftRadius: '70rem',
    borderBottomRightRadius: '70rem',
    borderColor: 'white',
    borderWidth: 10,
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 7 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
    // elevation: 10
  },
  whoseKini:{
    top: -10,
    fontSize: '11rem',
    color: gray.c,
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Bold'
  },
  img:{
    top: 17,
    height: deviceWidth -54,
    width: deviceWidth * 75 /100 -20,
    borderTopRightRadius: '60rem',
    borderBottomLeftRadius: '60rem',
    resizeMode: 'cover',
    transform: [{ rotate: '90deg' }]
    // 이미지가 안 돌아가기 시작한다면 아래 코드 사용...
    // width: '100%',
    // height: deviceWidth * 75 /100 -20,
    
    // resizeMode: 'cover',
  },
});

// todo: tab navigation
Rate.navigationOptions = ({navigation}) => ({
  headerShown: false,
})

export default connect(state => ({
  meals: state.meal.meals
}))(Rate);