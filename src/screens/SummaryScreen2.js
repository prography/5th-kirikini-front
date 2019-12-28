import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Image
} from 'react-native';
import NavBar from '../Components/NavBar';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

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

const todayScore = 5.7;
const kiriColor = '#F2F9F2';

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

// 일단 보여주기 용.....
const weeklyListArray = [
  {
    key: 0,
    day: '월',
    list: (
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            left: 30,
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: meal.a
          }}
        >
          <Image
            style={{ zIndex: 20, width: 20, height: 20, resizeMode: 'contain' }}
            source={require('../img/iconBeerSmall.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            zIndex: 10,
            left: 80,
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: meal.b
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            zIndex: 10,
            left: 160,
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: meal.c
          }}
        ></TouchableOpacity>
      </>
    )
  },
  {
    key: 1,
    day: '화'
  },
  {
    key: 2,
    day: '수'
  },
  {
    key: 3,
    day: '목'
  },
  {
    key: 4,
    day: '금'
  },
  {
    key: 5,
    day: '토'
  },
  {
    key: 6,
    day: '일'
  }
];
const WeeklyListToggled = () => {
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

//여기서부터 WeeklyReport

const WeeklyReportToggled = () => {

  

  const data1 = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        data: [6, 5, 8, 8, 9, 4, 2],
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`
      }
    ]
    // legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
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
};



const Summary2 = props => {
  const [weeklyListState, setWeeklyListState] = useState({ on: false });
  const weeklyListToggle = () => {
    setWeeklyListState({ on: !weeklyListState.on });
    console.log(weeklyListState);
  };

  const [weeklyReportState, setWeeklyReportState] = useState({ on: false });
  const weeklyReportToggle = () => {
    setWeeklyReportState({ on: !weeklyReportState.on });
    console.log(weeklyReportState);
  };

  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <View style={topBox.container}>
          <Text style={styles.txtBigTitle}>기록</Text>
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
              {weeklyListState.on && <WeeklyListToggled />}
            </TouchableOpacity>
            <TouchableOpacity
              style={bar.container}
              //   onPress={weeklyListToggle}
              activeOpacity={0.7}
              delayLongPress={150}
              onLongPress={weeklyReportToggle}
            >
              {!weeklyReportState.on && <WeeklyReportUntoggled />}
              {weeklyReportState.on && <WeeklyReportToggled />}
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

export default Summary2;
