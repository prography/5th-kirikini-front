import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import NavBar from '../Components/NavBar';

const LOAD_RATE_MEAL_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/rate/'
// const LOAD_RATE_MEAL_URL = 'http://localhost:8000/rate/'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const gray = {
  m: '#F2F9F2',
  a: '#EAEAEA',
  b: '#B7B7B7',
  c: '#898989',
  d: '#505151'
};

const yellow = {
  a: '#FCDB3A',
  b: '#F9CD15'
};

const meal = {
  a: '#C8BAE5',
  b: '#AFEAA2',
  c: '#AFCAF2',
  d: '#9CD8C8'
};

const Rate = props => {
  const [mealScore, setMealScore] = useState(5);
  const [mealToRate, setMealToRate] = useState([]);

  const onValueChange = mealScore => {
    setMealScore(mealScore);
  };

  const loadRateMeal = () => {
    const access_token = null, refresh_token = null;
      AsyncStorage.multiGet(["jwt_access_token", "jwt_refresh_token"]).then(response => {
        access_token = response[0][1];
        refresh_token = response[1][1];
        console.log("access_token: ", access_token)

        if(access_token !== null)
        {
          const headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded' // json으로 못 넘겨주겠음..
          };

          axios.get(LOAD_RATE_MEAL_URL, {headers})
            .then(response => {
              if(response.status == 200)
                setMealToRate(response.data)
            })
            .catch(err => console.log(err))
        }
      })
  }

  const rateMeal = () => {
    let access_token = null, refresh_token = null;
      AsyncStorage.multiGet(["jwt_access_token", "jwt_refresh_token"]).then(response => {
        access_token = response[0][1];
        refresh_token = response[1][1];
        console.log("access_token: ", access_token)

        if(access_token !== null)
        {
          const headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded' // json으로 못 넘겨주겠음..
          };

          const data = {
            meal: mealToRate,
            rating: mealScore
          }

          axios.post(RATE_MEAL_URL, data, {headers})
            .then(response => {
              if(response.status == 200)
              {
                // todo: rerender to load new meal to rate

              }
            })
            .catch(err => console.log(err))
        }
      })
  }

  useEffect(() => {
    loadRateMeal()
  })

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleHeader}>
          <Text style={styles.txtBigTitle}>끼니 채점</Text>
        </View>
        <View>
          <View style={mainImg.screen}>
            {
              mealToRate.length == 0 
              ?
              (
                <Text
                  style={{marginTop: 130, alignSelf: 'center'}}
                >
                  채점할 끼니가 없습니다 {'\n'}
                  다른 유저의 끼니 등록을 기다려주세요
                </Text>
              )
              :
              (
                <Image
                  style={{width: 200, height: 200}} // todo: 이미지 사이즈 조절
                  source={{uri: mealToRate.mealImage}}
                />
              )
            }
          </View>
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
        </View>

        <TouchableOpacity
          onPress={rateMeal}
        >
          <Text>
            채점
          </Text>
        </TouchableOpacity>
      </View>
      <NavBar navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: '#F2F9F2'
  },
  titleHeader: {
    height: 60
  },
  txtBigTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: gray.d
  }
});

const slider = StyleSheet.create({
  container: {
    marginTop: 120
  },
  txtScore: {
    marginBottom: 20,
    fontSize: 40,
    fontWeight: '700',
    color: yellow.b,
    textAlign: 'center'
  }
});

const mainImg = StyleSheet.create({
  screen: {
    width: deviceWidth - 34,
    height: 290,
    borderTopLeftRadius: 45,
    borderBottomRightRadius: 45,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1
  }
});

export default Rate;
