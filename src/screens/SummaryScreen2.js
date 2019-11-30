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

const Summary2 = props => {
  const [weeklyListState, setWeeklyListState] = useState({ on: false });
  const weeklyListToggle = () => {
    setWeeklyListState({ on: !weeklyListState.on });
    console.log(weeklyListState);
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
            <TouchableOpacity activeOpacity={0.7} style={bar.container}>
              <WeeklyReportUntoggled />
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
    elevation: 2
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
export default Summary2;
