import React, { useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity,
  StyleSheet, ScrollView, Dimensions,
  Modal, Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect, useDispatch } from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from 'axios';
import NavBar from '../Components/NavBar';
import { mealMonth } from '../store/meal/action';
import { localhost, LOAD_MONTH_MEAL_URL } from '../utils/consts'

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

const mealColor = {
  a: '#C8BAE5',
  b: '#AFEAA2',
  c: '#AFCAF2',
  d: '#9CD8C8'
};

const WeeklyListUntoggled = () => (
  <View style={barUntoggled.contentContainer}>
    <View style={wLUntoggled.sunMoonContainer}>
      <Image
        style={{ width: 20, height: 20, resizeMode: 'contain' }}
        source={require('../img/iconSunSmall.png')}
      />
      <Image
        style={{ width: 20, height: 20, resizeMode: 'contain' }}
        source={require('../img/iconMoonSmall.png')}
      />
    </View>
    <Text style={barUntoggled.txtTitle}>끼니 리스트</Text>
    <View style={barUntoggled.content}></View>
  </View>
);

const WeeklyReportUntoggled = () => (
  <View style={barUntoggled.contentContainer}>
    <Text style={barUntoggled.txtTitle}>주간 레포트</Text>
    <View style={barUntoggled.content}></View>
  </View>
);
const MonthlyListUntoggled = () => (
  <View style={barUntoggled.contentContainer}>
    <Text style={barUntoggled.txtTitle}>끼니 달력</Text>
    <View style={barUntoggled.content}></View>
  </View>
);
const MonthlyReportUntoggled = () => (
  <View style={barUntoggled.contentContainer}>
    <Text style={barUntoggled.txtTitle}>월간 레포트</Text>
    <View style={barUntoggled.content}></View>
  </View>
);

const WeeklyListToggled = (props) => {
  const { week, meals } = props

  const renderList = (_day) => { // 0:월, 1:화, ... , 6:일
    return (
      <>
        <View
          style={{
            position: 'absolute',
            left: 30,
            borderBottomColor: gray.m,
            borderBottomWidth: 3,
            width: 250
          }}
        ></View>
        {meals[week].map(meal => {
          if(meal.day == _day) {
            return (
              <TouchableOpacity
                key={meal.id}
                activeOpacity={0.8}
                style={{
                  zIndex: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: meal.average_rate + 35,
                  height: meal.average_rate + 35,
                  left: (((deviceWidth * 5) / 3 - 338) / 30) * (meal.created_at.slice(11, 13) - 6) - (meal.average_rate + 40) / 2 + 100,
                  borderRadius: 100,
                  backgroundColor: meal.mealType == 0 ? mealColor.a : (meal.mealType == 1 ? mealColor.b : (meal.mealType == 2 ? mealColor.c : mealColor.d))
                }}
              >
                <Image
                  style={{ 
                    zIndex: 20, 
                    width: 20, 
                    height: 20, 
                    resizeMode: 'contain' 
                  }}
                  source={meal.gihoType == 0 ? require('../img/iconCupSmall.png') : require('../img/iconBeerSmall.png')}
                />
              </TouchableOpacity>
            )
          }
        })}
      </>
    )
  }

  const weeklyListArray = [
    {
      key: 0,
      day: '월',
      list: renderList(0)
    },
    {
      key: 1,
      day: '화',
      list: renderList(1)
    },
    {
      key: 2,
      day: '수',
      list: renderList(2)
    },
    {
      key: 3,
      day: '목',
      list: renderList(3)
    },
    {
      key: 4,
      day: '금',
      list: renderList(4)
    },
    {
      key: 5,
      day: '토',
      list: renderList(5)
    },
    {
      key: 6,
      day: '일',
      list: renderList(6)
    }
  ];

  const MakeADay = () =>
    weeklyListArray.map(item => {
      return (
        <View key={item.key} style={wLToggled.oneDay}>
          <View style={wLToggled.day}>
            <Text style={wLToggled.txtDay}>{item.day}</Text>
          </View>
          <View style={wLToggled.circleContainer}>{item.list}</View>
        </View>
      );
    });

  return (
    <View style={barToggled.contentContainer}>
      <View style={wLToggled.sunMoonContainer}>
        <Image
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
          source={require('../img/iconSunSmall.png')}
        />
        <Image
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
          source={require('../img/iconMoonSmall.png')}
        />
      </View>
      <MakeADay weeklyListArray={weeklyListArray} />
    </View>
  );
};

const Summary2 = props => {
  const dispatch = useDispatch();

  const [weeklyListState, setWeeklyListState] = useState({ on: false });
  const weeklyListToggle = () => {
    setWeeklyListState({ on: !weeklyListState.on });
    console.log(weeklyListState);
  };

  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timestamp = new Date(Date.now() - timezoneOffset).toISOString();
  const month = Number(timestamp.slice(5, 7))
  const day = Number(timestamp.slice(8, 10))

  const [selectedMonth, setSelectedMonth] = useState(month)
  const [selectedWeek, setSelectedWeek] = useState(1)

  const month_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const week_list = [1, 2, 3, 4, 5]

  useEffect(() => {
    if(props.meals.length == 0)
      loadMonthMeals(month)
  })

  // Date 형태의 날짜를 가져온다.
  // 각 월별로 해당 주의 마지막 날짜보다 작거나 같은지 체크해서 작거나 같으면 해당 주, 식으로 계산

  const loadMonthMeals = (_month) => {
    let access_token = null, refresh_token = null;
    AsyncStorage.multiGet(["jwt_access_token", "jwt_refresh_token"]).then(response => {
      access_token = response[0][1];
      refresh_token = response[1][1];

      console.log("Acess:", access_token)
      const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded' // json으로 못 넘겨주겠음..
      };
  
      axios.post(LOAD_MONTH_MEAL_URL, {month: _month}, {headers})
        .then(result => {
          dispatch(mealMonth(result.data));
        })
        .catch(err => console.log(err))
    })
  }

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}> 
      <View style={styles.container}>
        <View style={topBox.container}>
          <Text style={styles.txtBigTitle}>기록</Text>
          <ScrollView horizontal={true}>
          {month_list.map(month => {
            if(selectedMonth == month)
            {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMonth(month)
                    loadMonthMeals(month)
                  }}
                  style={{margin: 10}}
                  key={month}
                >
                  <Text style={{color: 'red'}}>
                    {month}월
                  </Text>
                </TouchableOpacity>
              )
            }
            else
            {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMonth(month)
                    loadMonthMeals(month)
                  }}
                  style={{margin: 10}}
                  key={month}
                >
                  <Text style={{color: 'blue'}}>
                    {month}월
                  </Text>
                </TouchableOpacity>
              )
            }
          })}
          </ScrollView>
          <ScrollView horizontal={true}>
            {week_list.map(week => {
              if(selectedWeek == week)
              {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedWeek(week)
                    }}
                    style={{margin: 10}}
                    key={week}
                  >
                    <Text style={{color: 'red'}}>
                      {week}주
                    </Text>
                  </TouchableOpacity>
                )
              }
              else
              {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedWeek(week)
                    }}
                    style={{margin: 10}}
                    key={week}
                  >
                    <Text style={{color: 'blue'}}>
                      {week}주
                    </Text>
                  </TouchableOpacity>
                )
              }
            })}
          </ScrollView>
        </View>
        <View style={styles.scrollview}>
          <ScrollView>
            <View style={bar.topMargin} />
            <TouchableOpacity
              style={bar.container}
              //   onPress={weeklyListToggle}
              activeOpacity={0.7}
              delayLongPress={150}
              onLongPress={weeklyListToggle}
            >
              {!weeklyListState.on && <WeeklyListUntoggled />}
              {weeklyListState.on && <WeeklyListToggled week={selectedWeek} meals={props.meals} />}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={bar.container}>
              <WeeklyReportUntoggled />
              <LineChart
                data={{
                  labels: ["January", "February", "March", "April", "May", "June"],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }
                  ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel={"$"}
                yAxisSuffix={"k"}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={bar.container}>
              <MonthlyListUntoggled />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={bar.container}>
              <MonthlyReportUntoggled />
            </TouchableOpacity>
            <View style={bar.bottomMargin} />
          </ScrollView>
        </View>
      </View>
      <NavBar navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F9F2'
  },
  txtBigTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: gray.d
  },
  scrollview: {
    height: 600,
    top: -40
  }
});

const topBox = StyleSheet.create({
  container: {
    // position: 'absolute',
    // left: 0,
    zIndex: 10,
    height: 100,
    width: deviceWidth,
    backgroundColor: '#F2F9F2',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingRight: 17,
    paddingLeft: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 6
  }
});
const barToggled = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    height: 459,
    flex: 1
    // backgroundColor: gray.a
  }
});

const wLUntoggled = StyleSheet.create({
  sunMoonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
    width: 310
    // backgroundColor: gray.a
  }
});
const wLToggled = StyleSheet.create({
  sunMoonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
    width: 310
    // backgroundColor: gray.a
  },
  oneDay: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5
    // backgroundColor: 'yellow'
  },
  day: {
    flex: 1,
    justifyContent: 'center'
    // backgroundColor: gray.d
  },
  txtDay: {
    fontSize: 14,
    fontWeight: '600',
    color: gray.c
  },
  circleContainer: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: gray.b
  }
});

const bar = StyleSheet.create({
  topMargin: {
    height: 40
  },
  bottomMargin: {
    height: 100
  },
  container: {
    // height: 108,
    marginTop: 20,
    padding: 17,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1
  }
});

const barUntoggled = StyleSheet.create({
  contentContainer: {
    height: 74,
    // backgroundColor: yellow.a,
    alignItems: 'center'
  },
  txtTitle: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 16,
    color: gray.d
  },
  content: {
    marginTop: 5,
    marginBottom: 10,
    height: 67,
    width: '100%'
    // backgroundColor: gray.a
  }
});

export default connect(state => ({
  meals: state.meal.meals
}))(Summary2);