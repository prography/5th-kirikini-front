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
            legendFontColor: gray.c,
            legendFontSize: 13
          },
          {
            name: '외식',
            population: scoreByMealType[1]['count'],
            color: meal.b,
            legendFontColor: gray.c,
            legendFontSize: 13
          },
          {
            name: '배달',
            population: scoreByMealType[2]['count'],
            color: meal.c,
            legendFontColor: gray.c,
            legendFontSize: 13
          },
          {
            name: '간편',
            population: scoreByMealType[3]['count'],
            color: meal.d,
            legendFontColor: gray.c,
            legendFontSize: 13
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
      <View style={wr.container}>
        {/* 성적표 오프닝 */}
        <View style={wrBox.container}>
          <Text style={wrBox.txtTitle}>주간 성적표</Text>
          <View style={wrBox.scoreContainer}>
            <Text style={wrBox.txtChongjum}>주간 총점: </Text>
            <Text style={wr.txtScore}> {weekScore}</Text>
          </View>
          <Text style={wrBox.txt}>
            zwon.han님, 지난 7일 간 기록된 끼니를 바탕으로 끼리니가 열심히
            분석한 성적표💌가 도착했습니다! 더욱 더 건강한 끼니를 챙길 수 있도록
            끼리니가 응원할게요 👍 {'\n'}
            {'\n'}
            {!(weekScore && previousWeekScore)
              ? '주간 총점은 ' +
                weekScore +
                '점입니다! 끼니를 잊지 않고 꾸준히 입력해 주시면 끼리니가 전 주와의 점수 비교도 해준대요. 앞으로도 끼니 제출, 잊지 않기~'
              : weekScore - previousWeekScore > 0
              ? '주간 총점은 ' +
                weekScore +
                '으로, 지난주보다 ' +
                Math.abs(weekScore - previousWeekScore).toFixed(2) +
                '점 올랐네요! 👏👏👏 아주 좋아요!🥰 발전하는 ' +
                'zwon.han' +
                '님의 모습 멋져요~!'
              : '주간 총점은 ' +
                weekScore +
                '으로, 전 주보다 ' +
                Math.abs(weekScore - previousWeekScore).toFixed(2) +
                '점 떨어졌네요. 조금 아쉽죠? 😣 다음주는 더 잘 할 수 있을거라 끼리니는 믿어요! 화이팅!! 💪'}
          </Text>
        </View>
        {/* 끼니 횟수 */}
        <View style={wrBox.container}>
          <View style={wrBox.scoreContainer}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={wrBox.txtIndex}>주간 끼니 횟수: </Text>
              <Text style={wrBox.txtIndex}>🍽 하루 평균: </Text>
            </View>
            <View style={{ alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={wrBox.txtNumber}> {mealCount}</Text>
                <Text style={wrBox.txtIndex}>회 </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={wrBox.txtNumber}> {avgMealCount}</Text>
                <Text style={wrBox.txtIndex}>회 </Text>
              </View>
            </View>
          </View>
          <Text style={wrBox.txt}>
            zwon.han님의 주간 끼니 횟수는 총 {mealCount}회이고, 하루 평균{' '}
            {avgMealCount}회의 끼니를 드셨어요~ {feedback && feedback[5][0]}
          </Text>
        </View>
        {/* 커피와 음주 */}
        <View style={wrBox.container}>
          <View style={wrBox.scoreContainer}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={wrBox.txtIndex}>☕️ 커피 횟수: </Text>
              <Text style={wrBox.txtIndex}>🍺 음주 횟수: </Text>
            </View>
            <View style={{ alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={wrBox.txtNumber}> {coffeeCount}</Text>
                <Text style={wrBox.txtIndex}>회 </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={wrBox.txtNumber}> {drinkCount}</Text>
                <Text style={wrBox.txtIndex}>회 </Text>
              </View>
            </View>
          </View>
          <Text style={wrBox.txt}>
            일주일 동안 zwon.han님은 커피는 {coffeeCount}회,{' '}
            {feedback && feedback[5][2]}음주는 {drinkCount}
            회로, {feedback && feedback[5][1]}
          </Text>
        </View>
        {/* mealType별 */}
        <View style={wrBox.container}>
          <View style={wrBox.scoreContainer}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={wrBox.txtIndex}>끼니 유형별 분석</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <PieChart
              data={data3}
              width={deviceWidth}
              height={220}
              paddingLeft={deviceWidth / 9}
              chartConfig={chartConfig3}
              accessor="population"
              backgroundColor="transparent"
              absolute
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <BarChart
              style={graphStyle}
              data={data2}
              width={300}
              height={220}
              chartConfig={chartConfig2}
            />
          </View>
          <Text style={wrBox.txt}>{feedback[6]}</Text>
        </View>
      </View>

      {/* <View style={graph.chart}>
        <Text style={graph.text}>일별 건강도 추이(점)</Text>
        <LineChart
          data={data1}
          width={300}
          height={220}
          chartConfig={chartConfig1}
        />
      </View> */}

      {/* 커피와 음주 */}
      <View style={wrBox.lastContainer}>
        <View style={wrBox.scoreContainer}></View>
        <Text style={wrBox.txtIndex}>끼리니의 종합 피드백</Text>
        <Image style={wrBox.kirini} source={require('../img/kiriniLeaf.png')} />
        <View>
          <Text style={wrBox.txt}>
            {feedback[0]}
            {feedback[1]}
            {feedback[2]}
            {feedback[3]}
            {feedback[4]}
          </Text>
        </View>
      </View>
    </View>
  );

  const untoggledContent = (
    <View style={unToggled.container}>
      <View style={unToggled.left}>
        <Text style={unToggled.txtTitle}>주간 성적표</Text>
      </View>
      <View style={unToggled.right}>
        <View style={unToggled.scoreCompareArea}>
          <Text style={unToggled.scoreCompareTri}>
            {!(weekScore && previousWeekScore)
              ? null
              : weekScore - previousWeekScore > 0
              ? '▲ '
              : '▼ '}
          </Text>

          {!(weekScore && previousWeekScore) ? null : (
            <Text style={unToggled.scoreCompare}>
              Math.round(Math.abs(weekScore - previousWeekScore) * 10) / 10}
            </Text>
          )}
        </View>
        <Text style={unToggled.txtScore}>{weekScore}</Text>
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      style={bar.container}
      activeOpacity={0.85}
      onPress={pressWrToggle}
    >
      <NavigationEvents
        onWillFocus={() => {
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
    <View style={unToggled.container}>
      <View style={unToggled.left}>
        <Text style={unToggled.txtTitle}>끼니 기록부</Text>
      </View>
      <View style={unToggled.right}></View>
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
        <View style={wLToggled.line}></View>
        {Object.keys(meals).length > 0 &&
          meals[week].map(meal => {
            if (meal.day == _day) {
              return (
                <View
                  key={meal.id}
                  activeOpacity={0.8}
                  style={{
                    zIndex: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    width:
                      meal.average_rate *
                        meal.average_rate *
                        (deviceHeight / 2500) +
                      deviceHeight / 30,
                    height:
                      meal.average_rate *
                        meal.average_rate *
                        (deviceHeight / 2500) +
                      deviceHeight / 30,
                    // left:
                    //   (((deviceWidth * 5) / 3 - 338) / 30) *
                    //     (meal.created_at.slice(11, 13) - 6) -
                    //   (meal.average_rate + 40) / 2 +
                    //   100,
                    left:
                      ((((deviceWidth - 34) / 12) * 11 -
                        (100 * (deviceHeight / 2500) + deviceHeight / 30)) /
                        24) *
                        (meal.created_at.slice(11, 13) - 1) +
                      (50 * (deviceHeight / 2500) + deviceHeight / 30) -
                      (meal.average_rate *
                        meal.average_rate *
                        (deviceHeight / 2500) +
                        deviceHeight / 30) /
                        2,
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
                  {/* <Text>{meal.created_at.slice(11, 13)}</Text> */}
                  <Image
                    style={{
                      zIndex: 20,
                      width: deviceHeight / 40,
                      height: deviceHeight / 40,
                      resizeMode: 'contain'
                    }}
                    source={
                      meal.gihoType == 0
                        ? require('../img/iconCupSmall.png')
                        : require('../img/iconBeerSmall.png')
                    }
                  />
                </View>
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
          style={wLToggled.sun}
          source={require('../img/iconSunBigYellow.png')}
        />
        <Image
          style={wLToggled.moon}
          source={require('../img/iconMoonBigYellow.png')}
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
    loadMonthMeals(selectedMonth);
  }, [selectedMonth]);

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
                          <Text style={topBox.txtWeekSel}>주{week}</Text>
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
              activeOpacity={0.99}
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
    // height: (deviceHeight / 10) * 6,
    flex: 1
    // backgroundColor: gray.a
  }
});

const wLToggled = EStyleSheet.create({
  sunMoonContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
    // backgroundColor: gray.a
  },
  sun: {
    width: '22rem',
    height: '22rem',
    resizeMode: 'contain',
    marginLeft: deviceWidth / 12
  },
  moon: {
    width: '22rem',
    height: '22rem',
    resizeMode: 'contain'
  },
  oneDay: {
    flex: 1,
    flexDirection: 'row',
    height: deviceHeight / 12
    // marginBottom: 5,
    // marginTop: 5
    // backgroundColor: gray.a
  },
  day: {
    width: deviceWidth / 12,
    justifyContent: 'center'
    // backgroundColor: gray.d
  },
  txtDay: {
    fontSize: '15rem',
    fontWeight: weight.seven,
    color: gray.c
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: gray.b
  },
  line: {
    position: 'absolute',
    borderBottomColor: gray.m,
    borderBottomWidth: 3,
    width: ((deviceWidth - 34) / 12) * 11
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

const unToggled = EStyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: deviceHeight / 11,
    alignItems: 'center',
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    alignItems: 'flex-start'
    // backgroundColor: 'pink'
  },
  right: {
    flex: 3,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  txtTitle: {
    fontSize: '17rem',
    fontWeight: weight.seven,
    color: gray.d,
    lineHeight: '35rem'
  },
  txtScore: {
    fontFamily: 'JosefinSans-Bold',
    color: yellow.b,
    fontSize: '30rem',
    lineHeight: '35rem',
    textAlign: 'center'
  },
  scoreCompareArea: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  scoreCompareTri: {
    fontSize: '10rem',
    color: gray.b,
    fontFamily: 'JosefinSans-Bold',
    lineHeight: '15rem'
  },
  scoreCompare: {
    fontSize: '15rem',
    color: gray.b,
    fontFamily: 'JosefinSans-Bold',
    lineHeight: '15rem'
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
  },
  container: {}
});

const wrBox = EStyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: '30rem'
    // borderBottomColor: gray.m
    // borderBottomWidth: '2rem'
    // borderStyle: 'solid'
  },
  lastContainer: {
    alignItems: 'center',
    paddingBottom: '30rem',
    position: 'relative'
  },
  txtTitle: {
    fontSize: '17rem',
    fontWeight: weight.seven,
    color: gray.d,
    lineHeight: '35rem',
    marginBottom: '15rem'
  },
  txt: {
    color: gray.d,
    fontSize: '15rem',
    fontWeight: weight.five,
    lineHeight: '24rem'
  },
  txtChongjum: {
    color: gray.d,
    fontSize: '15rem',
    fontWeight: weight.seven,
    lineHeight: '35rem',
    textAlign: 'center'
  },
  txtIndex: {
    color: gray.d,
    fontSize: '15rem',
    fontWeight: weight.seven,
    lineHeight: '35rem',
    textAlign: 'center'
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '15rem',
    marginTop: '10rem'
  },
  txtNumber: {
    color: yellow.b,
    fontSize: '23rem',
    fontWeight: weight.seven,
    lineHeight: '35rem',
    textAlign: 'center',
    fontFamily: 'JosefinSans-Bold'
  },
  kirini: {
    width: '120rem',
    height: '90rem',
    resizeMode: 'contain',
    marginTop: '10rem',
    marginBottom: '20rem'
  }
});

// todo
Summary.navigationOptions = ({ navigation }) => ({
  headerShown: false
});

export default connect(state => ({
  meals: state.meal.meals
}))(Summary);
