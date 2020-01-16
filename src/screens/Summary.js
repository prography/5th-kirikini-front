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
import { LOAD_MONTH_MEAL_URL, deviceWidth, gray, yellow, mealColor, meal, kiriColor } from '../utils/consts'

const todayScore = 5.7;

const WeeklyReportToggled = () => {
  const data1 = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        data: [6, 5, 8, 8, 9, 4, 2],
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`
      }
    ]
  };

  const data2 = {
    labels: ["집밥", "외식", "배달", "간편"],
    datasets: [
      {
        data: [1,2,3,4],
        color: (opacity = 1) => `rgba(249, 205, 21, ${opacity})`
      }
    ]
  };

  const data3 = [
    {
      name: "집밥",
      population: 7,
      color: meal.a,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "외식",
      population: 4,
      color: meal.b,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "배달",
      population: 3,
      color: meal.c,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "간편",
      population: 8,
      color: meal.d,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const chartConfig1 = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
  };

  const chartConfig2 = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
  };

  const chartConfig3 = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
  };

  const graphStyle = {
    borderRadius: 16
  };
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={balloonSt.balloon}>
      <View style={balloonSt.topBar}>
        <Text style={styles.txtBigTitle}>이주의 건강도</Text>
        <Text style={balloonText.todayScore}>{todayScore}</Text>
      </View>
      <View style={balloonSt.scoreCompareArea}>
        <Text style={balloonText.scoreCompare}>▲ 1.2</Text>
      </View>
      <View style={balloonSt.lastMealTimeContainer}>
        <View style={balloonSt.lastMealIconWrapper}>
          <Text style={balloonText.lastMealTime}>
            이주의 총 끼니 횟수는 🍽 :{'\n'}
            이주의 하루 평균 끼니 횟수는 🍽 :{'\n'}
            이주의 총 음주 횟수는 🍺 :{'\n'}
            이주의 총 커피 횟수는 ☕️ :{'\n'}
          </Text>
        </View>
        <View style={balloonSt.lastMealTimeWrapper}>
          <Text style={balloonText.lastMealTime}>
            12회
            {'\n'}
            2회
            {'\n'}
            3회
            {'\n'}
            10회
            {'\n'}
          </Text>
        </View>
      </View>
      <View style={graph.chart}>
        <Text style={graph.text}>일별 건강도 추이(점)</Text>
        <LineChart
        data={data1}
        width={300}
        height={220}
        chartConfig={chartConfig1}
      /></View>
      <View style={graph.chart}>
      <Text style={graph.text}>끼니 유형별 건강도(점)</Text>
        <BarChart 
        style={graphStyle} 
        data={data2} 
        width={300} 
        height={220}
        chartConfig={chartConfig2}/>
      </View>
      <View style={graph.chart}>
      <Text style={graph.text}>끼니 유형별 횟수(회)</Text>              
        <PieChart
        data={data3}
        width={350}
        height={220}
        chartConfig={chartConfig3}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        />
      </View>

      <View style={graph.chart}>
      <Text style={graph.text}>이주의 피드백</Text>
        <Text >
          Zwon 님은 커피왕에 선정되었습니다{'\n'}
          나보다 잘 먹네... {'\n'}
          대체 뭘 먹은거야?
        </Text>
      </View>
    </View>
  );
}

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
        {meals.length > 0 && meals[week].map(meal => {
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

const Summary = props => {
  const dispatch = useDispatch();

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
    AsyncStorage.multiGet(["@jwt_access_token", "@jwt_refresh_token"]).then(response => {
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
          <ScrollView
            style={{flex:1}}
          >
            <View
              style={bar.container}
              activeOpacity={0.7}
            >
              <WeeklyListToggled week={selectedWeek} meals={props.meals} />
            </View>
            <View
              style={bar.container}
              activeOpacity={0.7}
            >
              <WeeklyReportToggled />
            </View>

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
    flex: 1,
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

const graph = StyleSheet.create({
  chart: {
    alignItems:'center',
    display:'flex'
  },
  text:{
    width:180,
    padding:20
  }
})

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

// todo 
Summary.navigationOptions = ({navigation}) => ({
  headerShown: false,
})

export default connect(state => ({
  meals: state.meal.meals
}))(Summary);