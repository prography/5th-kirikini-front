import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Image
} from 'react-native';
import NavBar from '../Components/NavBar';

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

const WeeklyListUntoggled = () => (
  <View style={barUntoggled.contentContainer}>
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

const weeklyListArray = [
  {
    key: 0,
    day: '월'
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
          <View style={wLToggled.circleContainer}></View>
        </View>
      );
    });

  return (
    <View style={barToggled.contentContainer}>
      <MakeADay weeklyListArray={weeklyListArray} />
    </View>
  );
};

const Summary2 = props => {
  const [weeklyListState, setWeeklyListState] = useState({ on: false });
  const weeklyListToggle = () => {
    setWeeklyListState({ on: !weeklyListState.on });
    console.log(weeklyListState);
  };
  return (
    <View style={{ backgroundColor: '#F2F9F2', flex: 1 }}>
      <View style={styles.container}>
        <View style={topBox.container}></View>
        <View style={styles.scrollview}>
          <ScrollView>
            <View style={bar.topMargin} />
            <TouchableOpacity style={bar.container} onPress={weeklyListToggle}>
              {!weeklyListState.on && <WeeklyListUntoggled />}
              {weeklyListState.on && <WeeklyListToggled />}
            </TouchableOpacity>
            <TouchableOpacity style={bar.container}>
              <WeeklyReportUntoggled />
            </TouchableOpacity>
            <TouchableOpacity style={bar.container}>
              <MonthlyListUntoggled />
            </TouchableOpacity>
            <TouchableOpacity style={bar.container}>
              <MonthlyReportUntoggled />
            </TouchableOpacity>
            <View style={bar.bottomMargin} />
          </ScrollView>
        </View>
      </View>
      <NavBar navigation={props.navigation} default={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F2F9F2'
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
    paddingRight: 10,
    paddingLeft: 10,
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
    height: 473,
    flex: 1
    // backgroundColor: gray.a
  }
});
const wLToggled = StyleSheet.create({
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
    backgroundColor: gray.b
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
    padding: 10,
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
    height: 88,
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
export default Summary2;
