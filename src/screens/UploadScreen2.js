import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';
import { RNS3 } from 'react-native-aws3';
import axios from 'axios';
import MealTypeButton from '../Components/MealTypeButton';
import DrinkTypeButton from '../Components/DrinkButton';
import secretKey from '../../secrets_front.json'

// const SAVE_MEAL_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/'
const SAVE_MEAL_URL = 'http://localhost:8000/meal/'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// AWS S3
const s3_options = {
  keyPrefix: "uploads/",
  bucket: "kirikini",
  region: "ap-northeast-2",
  accessKey: "AKIAWMXSZW6I2XTZR5HX",
  secretKey: secretKey['AWS_S3_SECRET_KEY'],
  successActionStatus: 201
}

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
const Upload2 = props => {
  const [mealScore, setMealScore] = useState(5);
  const [mealImage, setMealImage] = useState('');

  const updateMealImage = () => {
    AsyncStorage.getItem('mealImage')
      .then(uri => setMealImage(uri))
      .catch(err => console.log("load image failed"))
  }

  const change = mealScore => {
    setMealScore(parseFloat(mealScore));
  };

  const upload = () => {
    const { file } = props.saved;
    RNS3.put(file, s3_options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body);

      const data = {
        mealType: props.saved.mealType,
        gihoType: props.saved.gihoType,
        picURL: response.body.postResponse.location,
        rating: mealScore,
        created_at: props.saved.timestamp
      }
      console.log("data: ", data)

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

          axios.post(SAVE_MEAL_URL, data, {headers})
            .then(response => {
              console.log("meals: ", response['data'])
              
              // let data = response['data']
              // setMeals(data)
              props.navigation.goBack();
            })
            .catch(err => console.log(err))
        }
        console.log(222)
      })
    });
  }

  const natvigationOptions = {
    headerStyle: {
      backgroundColor: 'white'
    }
  };

  console.log("mealImage: ", mealImage)

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <NavigationEvents
        onWillFocus={() => updateMealImage()}
      />
      <View style={styles.container}>
        <View style={styles.mintbackground} />
        <View style={styles.titleHeader}>
          <Text style={styles.txtBigTitle}>끼니 추가</Text>
        </View>
        <View>
          { mealImage ? (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Camera')}
              activeOpacity={0.6}
              style={mainImg.screen}
            >
              <Image
                style={{width: 200, height: 200}} // todo: 이미지 사이즈 조절
                source={{uri: mealImage}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
            onPress={() => props.navigation.navigate('Camera')}
            activeOpacity={0.6}
            style={mainImg.screen}
            >
              <Text style={mainImg.txt}>터치해서 끼니 촬영</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView>
          <View style={dateTime.container}>
            <Text style={dateTime.txt}> 2019. 11. 30 03:12 pm</Text>
          </View>
          <DrinkTypeButton />
          <MealTypeButton />
        </ScrollView>
      </View>

      <View style={slider.container}>
        <Text style={slider.txtScore}>{String(mealScore)}</Text>
        <Slider
          step={1}
          value={5}
          thumbTintColor={yellow.a}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={yellow.a}
          maximumTrackTintColor={gray.a}
          onValueChange={change.bind(this)}
          mealScore={mealScore}
        />
      </View>

      <View style={styles.submitButton}>
        <TouchableOpacity
          style={styles.submitTouchable}
          onPress={() => upload()}
        >
          <Text style={styles.txtSubmit}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: 'white'
  },
  titleHeader: {
    height: 60
  },
  txtBigTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: gray.d
  },
  mintbackground: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 0,
    height: (deviceHeight / 9) * 5,
    width: deviceWidth,
    paddingTop: 16,
    paddingLeft: 17,
    paddingRight: 17,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: gray.m
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight / 9,
    width: deviceWidth,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: gray.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 2
  },
  //   shadow 때문에 따로 만들어서 적용
  submitTouchable: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: deviceHeight / 9,
    width: deviceWidth,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  txtSubmit: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: '600',
    color: gray.c
  }
});
const dateTime = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 3,
    marginBottom: 5
  },
  txt: {
    fontWeight: '700',
    fontSize: 15,
    color: gray.b
  }
});

const slider = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 0,
    height: (deviceHeight / 9) * 2.2,
    width: deviceWidth,
    paddingTop: 16,
    paddingLeft: 17,
    paddingRight: 17,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white'
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    // elevation: 6
  },
  txtScore: {
    marginBottom: 6,
    fontSize: 25,
    fontWeight: '600',
    color: yellow.b,
    textAlign: 'center'
  }
});

const mainImg = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth - 34,
    height: 290,
    borderTopLeftRadius: 45,
    borderBottomRightRadius: 45,
    borderColor: gray.m,
    borderWidth: 4,
    backgroundColor: 'white'
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 7 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
    // elevation: 1
  },
  txt: {
    color: gray.b,
    fontWeight: '700',
    fontSize: 16
  }
});

// export default Upload2;
export default connect(state => ({
  saved: state.meal.saved
}))(Upload2);