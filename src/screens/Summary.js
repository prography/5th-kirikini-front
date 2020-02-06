import React, { useState, useEffect, Fragment } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Image,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect, useDispatch } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import { mealMonth } from '../store/meal/action';
import {
  LOAD_MONTH_MEAL_URL,
  LOAD_WEEK_REPORT_URL,
  deviceWidth,
  gray,
  yellow,
  mealColor,
  meal,
  kiriColor,
  screenWidth,
  home,
  weight,
  deviceHeight
} from '../utils/consts';

// 주간 레포트 시작 ------------------------------------------------------------------
const WeeklyReportToggled = () => {
  console.log("weeklyReportToggled")
  const [mealCount, setMealCount] = useState(0);
  const [avgMealCount, setAvgMealCount] = useState(0);
  const [weekScore, setWeekScore] = useState(0);
  const [previousWeekScore, setPreviousWeekScore] = useState();
  const [drinkCount, setDrinkCount] = useState(0);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [scoreByDay, setScoreByDay] = useState([]);
  const [scoreByMealType, setScoreByMealType] = useState([]);
  const [countsByMealType, setCountsByMealType] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [wrToggle, setWrToggle] = useState({ on: false });
  const pressWrToggle = () => {
    setWrToggle({ on: !wrToggle.on });
  };

  const loadWeekReport = () => {
    console.log("loadWeekReport")
    let access_token = null,
      refresh_token = null;
    AsyncStorage.multiGet([
      '@jwt_access_token',
      '@jwt_refresh_token',
      '@email'
    ]).then(response => {
      const user_name = response[2][1].slice(0, response[2][1].indexOf('@'));
      access_token = response[0][1];
      refresh_token = response[1][1];
      if (access_token !== null) {
        const headers = {
          Authorization: `Bearer ${access_token}`
        };

        axios
          .post(LOAD_WEEK_REPORT_URL, user_name, { headers })
          .then(response => {
            console.log("response", response["data"])
            const {
              meal_count,
              avg_meal_count,
              coffee_count,
              drink_count,
              counts_by_meal_type,
              score_by_day,
              score_by_meal_type,
              week_score,
              previous_week_score,
              feedback
            } = response['data'];

            setMealCount(meal_count);
            setAvgMealCount(avg_meal_count);
            setCoffeeCount(coffee_count);
            setDrinkCount(drink_count);
            setCountsByMealType(counts_by_meal_type);
            setScoreByDay(score_by_day);
            setScoreByMealType(score_by_meal_type);
            setWeekScore(week_score);
            setPreviousWeekScore(previous_week_score);
            setFeedback(feedback);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const data1 = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        data:
          scoreByDay.length > 0
            ? [
                scoreByDay[0]['score'],
                scoreByDay[1]['score'],
                scoreByDay[2]['score'],
                scoreByDay[3]['score'],
                scoreByDay[4]['score'],
                scoreByDay[5]['score'],
                scoreByDay[6]['score']
              ]
            : [0, 0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`
      }
    ]
  };

  const data2 = {
    labels: ['집밥', '외식', '배달', '간편'],
    datasets: [
      {
        data:
          scoreByMealType.length > 0
            ? [
                scoreByMealType[0]['score'],
                scoreByMealType[1]['score'],
                scoreByMealType[2]['score'],
                scoreByMealType[3]['score']
              ]
            : [1, 2, 3, 4],
        color: (opacity = 1) => `rgba(249, 205, 21, ${opacity})`
      }
    ]
  };

  const data3 =
    scoreByMealType.length > 0
      ? [
          {
            name: '집밥',
            population: scoreByMealType[0]['count'],
            color: meal.a,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: '외식',
            population: scoreByMealType[1]['count'],
            color: meal.b,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: '배달',
            population: scoreByMealType[2]['count'],
            color: meal.c,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: '간편',
            population: scoreByMealType[3]['count'],
            color: meal.d,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          }
        ]
      : [
          {
            name: '집밥',
            population: 1,
            color: meal.a,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: '외식',
            population: 1,
            color: meal.b,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: '배달',
            population: 1,
            color: meal.c,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          },
          {
            name: '간편',
            population: 1,
            color: meal.d,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          }
        ];

  const chartConfig1 = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,

    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
  };

  const chartConfig2 = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,

    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
  };

  const chartConfig3 = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,

    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
  };

  const graphStyle = {
    borderRadius: 16
  };

  const toggleContent = (
    <View>
    
      <View style={balloonSt.topBar}>
        <Text style={styles.txtBigTitle}>이주의 건강도</Text>
        <Text style={balloonText.todayScore}>{weekScore}</Text>
      </View>
      <View style={balloonSt.scoreCompareArea}>
        <Text style={balloonText.scoreCompare}>
          {!(weekScore && previousWeekScore)
            ? '-'
            : weekScore - previousWeekScore > 0
            ? '▲'
            : '▼'}
          {!(weekScore && previousWeekScore)
            ? null
            : Math.abs(weekScore - previousWeekScore).toFixed(2)}
        </Text>
      </View>
      <View style={balloonSt.lastMealTimeContainer}>
        <View style={balloonSt.lastMealIconWrapper}>
          <Text style={balloonText.lastMealTime}>
            이주의 총 끼니 횟수는 🍽 :{'\n'}
            이주의 하루 평균 끼니 횟수는 🍽 :{'\n'}
            이주의 총 커피 횟수는 ☕️ :{'\n'}
            이주의 총 음주 횟수는 🍺 :{'\n'}
          </Text>
        </View>
        <View style={balloonSt.lastMealTimeWrapper}>
          <Text style={balloonText.lastMealTime}>
            {mealCount}회{'\n'}
            {avgMealCount}회{'\n'}
            {coffeeCount}회{'\n'}
            {drinkCount}회{'\n'}
          </Text>
        </View>
      </View>
      <View>
        <Text>🍽 :{feedback && feedback[5][0]}</Text>
        <Text>🍺 :{feedback && feedback[5][1]}</Text>
        <Text>☕️ :{feedback && feedback[5][2]}</Text>
      </View>
      <View style={graph.chart}>
        <Text style={graph.text}>일별 건강도 추이(점)</Text>
        <LineChart
          data={data1}
          width={300}
          height={220}
          chartConfig={chartConfig1}
        />
      </View>
      <View style={graph.chart}>
        <Text style={graph.text}>끼니 유형별 건강도(점)</Text>
        <BarChart
          style={graphStyle}
          data={data2}
          width={300}
          height={220}
          chartConfig={chartConfig2}
        />
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
        <Text>{feedback[6]}</Text>
      </View>

      <View style={graph.chart}>
        <Text style={graph.text}>이주의 피드백</Text>
        <View>
          <Text>{feedback[0]}</Text>
          <Text>{feedback[1]}</Text>
          <Text>{feedback[2]}</Text>
          <Text>{feedback[3]}</Text>
          <Text>{feedback[4]}</Text>
        </View>
      </View>
    </View>
  );

  const untoggledContent = (
    <View style={wr.containerUntoggled}>
      <Text style={wr.txtTitle}>주간 성적표</Text>
      <Text style={wr.txtScore}>{weekScore} 점</Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={bar.container}
      activeOpacity={0.7}
      onPress={pressWrToggle}
    >
      <NavigationEvents
        onWillFocus={() => {
          console.log("onWillFocus")
          loadWeekReport();
        }}
      />
      {wrToggle.on && toggleContent}
      {!wrToggle.on && untoggledContent}
    </TouchableOpacity>
  );
};
// 끝 ------------------------------------------------------------------

const WeeklyListOff = props => {
  return (
    <View
      style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>주간 기록지</Text>
    </View>
  );
};

// 주간 리스트 시작 ------------------------------------------------------------------
const WeeklyListToggled = props => {
  const { week, meals } = props;

  const renderList = _day => {
    // 0:월, 1:화, ... , 6:일
    return (
      <Fragment>
        <View
          style={{
            position: 'absolute',
            left: 30,
            borderBottomColor: gray.m,
            borderBottomWidth: 3,
            width: 250
          }}
        ></View>
        {Object.keys(meals).length > 0 &&
          meals[week].map(meal => {
            if (meal.day == _day) {
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
                    left:
                      (((deviceWidth * 5) / 3 - 338) / 30) *
                        (meal.created_at.slice(11, 13) - 6) -
                      (meal.average_rate + 40) / 2 +
                      100,
                    borderRadius: 100,
                    backgroundColor:
                      meal.mealType == 0
                        ? mealColor.a
                        : meal.mealType == 1
                        ? mealColor.b
                        : meal.mealType == 2
                        ? mealColor.c
                        : mealColor.d
                  }}
                >
                  <Image
                    style={{
                      zIndex: 20,
                      width: 20,
                      height: 20,
                      resizeMode: 'contain'
                    }}
                    source={
                      meal.gihoType == 0
                        ? require('../img/iconCupSmall.png')
                        : require('../img/iconBeerSmall.png')
                    }
                  />
                </TouchableOpacity>
              );
            }
          })}
      </Fragment>
    );
  };

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
// 끝------------------------------------------------------------------
// 전체 화면 시작 ------------------------------------------------------------------
const Summary = props => {
  const dispatch = useDispatch();

  const [weeklyListState, setWeeklyListState] = useState({ on: false });
  const [weeklyReportState, setWeeklyReportState] = useState({ on: false });
  const weeklyListToggle = () => {
    setWeeklyListState({ on: !weeklyListState.on });
  };
  const weeklyReportToggle = () => {
    setWeeklyReportState({ on: !weeklyReportState.on });
  };

  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timestamp = new Date(Date.now() - timezoneOffset).toISOString();
  const month = Number(timestamp.slice(5, 7));
  const day = Number(timestamp.slice(8, 10));

  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedWeek, setSelectedWeek] = useState(1);

  const month_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const week_list = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (props.meals.length == 0) {
      loadMonthMeals(month);
    }
  }, []);

  // Date 형태의 날짜를 가져온다.
  // 각 월별로 해당 주의 마지막 날짜보다 작거나 같은지 체크해서 작거나 같으면 해당 주, 식으로 계산

  const loadMonthMeals = _month => {
    let access_token = null,
      refresh_token = null;
    AsyncStorage.multiGet(['@jwt_access_token', '@jwt_refresh_token']).then(
      response => {
        access_token = response[0][1];
        refresh_token = response[1][1];

        const headers = {
          Authorization: `Bearer ${access_token}`
        };

        axios
          .post(LOAD_MONTH_MEAL_URL, { month: _month }, { headers })
          .then(result => {
            dispatch(mealMonth(result.data));
          })
          .catch(err => console.log(err));
      }
    );
  };

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: 'transparent' }}
        >
          <View style={topBox.container}>
            <View style={styles.topMargin} />
            <Text style={styles.txtBigTitle}>끼니 성적표</Text>

            <View style={topBox.topLine}>
              <View style={topBox.monthContainer}>
                <TouchableOpacity
                  style={topBox.setMonthContainerL}
                  onPress={() => {
                    if (selectedMonth < 2) {
                      return null;
                    } else {
                      setSelectedMonth(selectedMonth - 1);
                      loadMonthMeals(selectedMonth - 1);
                    }
                  }}
                >
                  <Text style={topBox.setMonth}>{`◀︎`}</Text>
                </TouchableOpacity>
                <Text style={topBox.txtMonth}>{selectedMonth}월</Text>
                <TouchableOpacity
                  style={topBox.setMonthContainerR}
                  onPress={() => {
                    if (selectedMonth > 11) {
                      return null;
                    } else {
                      setSelectedMonth(selectedMonth + 1);
                      loadMonthMeals(selectedMonth + 1);
                    }
                  }}
                >
                  <Text style={topBox.setMonth}>{`▶︎`}</Text>
                </TouchableOpacity>
              </View>
              <Text style={topBox.txtDate}>2020.2.3 ~ 2.9</Text>
              <View style={topBox.weekContainer}>
                {week_list.map(week => {
                  if (selectedWeek == week) {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedWeek(week);
                        }}
                        key={week}
                        style={topBox.weekButtonTouch}
                      >
                        <View style={topBox.weekButtonSel}>
                          <Text style={topBox.txtWeekSel}>{week}주</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedWeek(week);
                        }}
                        style={topBox.weekButtonTouch}
                        key={week}
                      >
                        <View style={topBox.weekButtonUnsel}>
                          <Text style={topBox.txtWeekUnsel}>{week}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            </View>
          </View>

          <GestureHandlerScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={styles.scrollInside}
          >
            <TouchableOpacity
              style={bar.container}
              activeOpacity={0.7}
              onPress={weeklyListToggle}
            >
              {!weeklyListState.on && <WeeklyListOff />}
              {weeklyListState.on && (
                <WeeklyListToggled week={selectedWeek} meals={props.meals} />
              )}
            </TouchableOpacity>
            <WeeklyReportToggled />
          </GestureHandlerScrollView>
        </ScrollView>
      </View>
      <NavBar navigation={props.navigation} />
    </View>
  );
};
// 끝 ------------------------------------------------------------------

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
    // backgroundColor: 'white'
  },
  topMargin: {
    height: home.margin
  },
  txtBigTitle: {
    fontSize: '23rem',
    color: gray.d,
    lineHeight: '32rem',
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: weight.eight
  },
  scrollview: {
    flex: 1
  },
  scrollInside: {
    width: '100%',
    // height: (deviceHeight / 3.6) * 2.6 - home.margin
    height: 700
    // backgroundColor: 'pink'
  }
});

const topBox = EStyleSheet.create({
  container: {
    // zIndex: 10,
    height: deviceHeight / 3.6,
    width: deviceWidth,
    paddingRight: 17,
    paddingLeft: 17,
    justifyContent: 'flex-start'
    // backgroundColor: 'red'
  },
  topLine: {
    // backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10rem'
  },
  txtMonth: {
    fontSize: '16rem',
    color: gray.d,
    lineHeight: '30rem',
    fontWeight: weight.seven,
    // backgroundColor: 'red',
    width: '38rem',
    textAlign: 'center'
  },
  txtWeekScore: {
    fontSize: '25rem',
    lineHeight: '30rem',
    fontFamily: 'JosefinSans-Bold',
    color: yellow.b,
    // backgroundColor: 'red',
    width: deviceWidth / 7,
    textAlign: 'right'
    // width: '30rem'
  },
  txtDate: {
    fontSize: '13rem',
    color: gray.b,
    fontWeight: weight.five,
    marginBottom: '10rem'
  },
  monthContainer: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    justifyContent: 'center'
    // marginBottom: '1rem'
    // top: '-45rem'
  },
  weekContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    width: (deviceWidth / 7) * 5.5
    // top: '-45rem'
  },

  setMonthContainerL: {
    // backgroundColor: 'pink',
    width: '40rem',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: '5rem'
  },
  setMonthContainerR: {
    // backgroundColor: 'pink',
    width: '40rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '5rem'
  },
  setMonth: {
    fontFamily: 'Digitalt',
    fontSize: '20rem',
    color: yellow.b,
    lineHeight: '30rem'
  },
  weekButtonTouch: {
    // backgroundColor: 'red',
    width: '50rem',
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  weekButtonSel: {
    backgroundColor: yellow.a,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30rem',
    height: '30rem',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 1
  },
  weekButtonUnsel: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30rem',
    height: '30rem',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 2
  },
  txtWeekSel: {
    color: 'white',
    fontSize: '14rem',
    fontWeight: weight.eight
  },
  txtWeekUnsel: {
    color: gray.m,
    fontSize: '14rem',
    fontWeight: weight.eight
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
    alignItems: 'center',
    display: 'flex'
  },
  text: {
    width: 180,
    padding: 20
  }
});

const bar = EStyleSheet.create({
  container: {
    // height: 108,
    marginTop: '20rem',
    padding: 17,
    borderTopLeftRadius: '40rem',
    borderBottomRightRadius: '40rem',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5
  }
});

const wr = EStyleSheet.create({
  containerUntoggled: {
    // backgroundColor: 'red',
    height: '70rem',
    alignItems: 'center',
    flexDirection: 'row'
  },
  txtTitle: {
    fontSize: '17rem',
    fontWeight: weight.seven,
    color: gray.c,
    lineHeight: '35rem',
    textAlign: 'center'
  },
  txtScore: {
    fontFamily: 'JosefinSans-Bold',
    color: yellow.b,
    fontSize: '30rem',
    lineHeight: '35rem',
    textAlign: 'center'
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
Summary.navigationOptions = ({ navigation }) => ({
  headerShown: false
});

export default connect(state => ({
  meals: state.meal.meals
}))(Summary);
