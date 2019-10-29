import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const kiri = {
  a: '#D3E0AA',
  b: '#B5DCA4',
  c: '#7BB78E',
  d: '#549286',
  e: '#3B656F',
  p: '#FF8603',
};

let kiriColor = kiri.c;
let todayScore = 5.5;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.navBar}></View>
        <View style={styles.mainContainer}>
          <View style={styles.balloonContainer}>
            <View style={styles.balloonTopBar}>
              <Text style={texts.balloonTodayTitle}>오늘 건강도</Text>
              <Text style={texts.balloonTodayScore}>{todayScore}</Text>
            </View>
            <View style={styles.scoreCompare}>
              <Text style={texts.scoreCompare}>▲ 1.2</Text>
            </View>
            <View style={styles.balloonMiddle}>
              <View style={styles.lastMealIcon}>
                <Text style={texts.lastMeal}>
                  🍽 :{'\n'}
                  🍺 :{'\n'}
                  ☕️ :{'\n'}
                </Text>
              </View>
              <View style={styles.lastMealTime}>
                <Text style={texts.lastMeal}>
                  1시간 58분{'\n'}
                  254시간{'\n'}
                  31시간{'\n'}
                </Text>
              </View>
            </View>
            <View style={styles.balloonBottom}>
              <Text style={texts.balloonBottom}>
                끼니님의 현 하루 건강도는... {todayScore}점! {'\n'}
                나보다 잘 먹네... {'\n'}
                좋겠다...!
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <View style={styles.todayMealContainer}>
          <ScrollView horizontal={true}>
            <View style={styles.capsulesContainer}>
              <View style={styles.capsulesContainerFirstMargin}></View>
              <View style={styles.oneMealContainer}>
                <Text style={texts.oneMealTime}>06:12 am</Text>
                <View style={styles.oneCapsule}>
                  <Text style={texts.oneMealScore}>{todayScore}</Text>
                  <View style={styles.oneCirclePhoto}></View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity>
            <View style={styles.addMealButton}>
              <Text style={texts.addMealButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const texts = StyleSheet.create({
  balloonTodayTitle: {
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 45,
    color: kiriColor,
  },
  balloonTodayScore: {
    fontSize: 45,
    fontWeight: '700',
    color: kiri.p,
  },
  scoreCompare: {
    color: '#9C9C9C',
  },

  lastMeal: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    lineHeight: 39,
    color: '#6F6F6F',
  },
  balloonBottom: {
    fontSize: 18,
    fontWeight: '500',
    color: '#404040',
    textAlign: 'right',
    lineHeight: 26,
  },
  oneMealTime: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.8,
    marginBottom: 9,
  },
  oneMealScore: {
    marginBottom: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  addMealButtonText: {
    fontSize: 60,
    color: 'white',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: kiriColor,
  },
  topHalf: {
    flex: 1.5,
    flexDirection: 'row',
  },
  navBar: {
    flex: 1,
  },
  mainContainer: {
    flex: 4,
  },
  balloonContainer: {
    height: 340,
    width: (deviceWidth * 4) / 5,
    padding: deviceWidth / 10,
    borderTopLeftRadius: 70,
    borderBottomRightRadius: 70,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  balloonTopBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreCompare: {
    alignItems: 'flex-end',
  },
  balloonMiddle: {
    flex: 2,
    flexDirection: 'row',
  },
  lastMealIcon: {
    flex: 7,
    justifyContent: 'center',
  },
  lastMealTime: {
    flex: 3,
    paddingLeft: 6,
    justifyContent: 'center',
  },
  balloonBottom: {
    flex: 1.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bottomHalf: {
    flex: 1,
  },
  todayMealContainer: {
    flex: 3.2,
    backgroundColor: kiriColor,
  },
  capsulesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  capsulesContainerFirstMargin: {
    width: deviceWidth / 5,
  },
  oneMealContainer: {
    flex: 1,
    width: deviceWidth / 4,
    marginRight: deviceWidth / 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  oneCapsule: {
    height: deviceHeight / 4.8,
    width: deviceWidth / 4,
    marginBottom: 6,
    borderRadius: 100,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: kiri.d,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  oneCirclePhoto: {
    height: deviceWidth / 4.5,
    width: deviceWidth / 4.5,
    marginBottom: 3,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  bottomBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addMealButton: {
    width: deviceWidth / 5.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
