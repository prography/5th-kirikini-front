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
import { connect } from 'react-redux';
import NavBar from '../Components/NavBar';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const gray = {
  a: 'white',
  b: '#B0B0B0',
  c: '#6F6F6F',
  d: '#404040'
};

// 위클리 리스트 토글 안 됐을 때 보이는...
const WeeklyListOff = () => (
  <View>
    <Text style={styles.text}>WeeklyList</Text>
  </View>
);
// 위클리 리스트 안의 동글뱅이들 만들어줌
const OneMealCircle = props => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log('모달:' + modalVisible);

  var circleColor = 'red';
  if (props.mealType === 'a') {
    var circleColor = gray.a;
  }
  if (props.mealType === 'b') {
    var circleColor = gray.b;
  }
  if (props.mealType === 'c') {
    var circleColor = gray.c;
  }
  if (props.mealType === 'd') {
    var circleColor = gray.d;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={{
          position: 'absolute',
          left:
            ((((deviceWidth - 20) * 7) / 8 - 65) / 24) * props.oneMealTime -
            (props.oneMealScore * 4.5 + 20) / 2 +
            32.5,
          width: props.oneMealScore * 4.5 + 20,
          height: props.oneMealScore * 4.5 + 20,
          borderRadius: 100,
          backgroundColor: circleColor,
          opacity: 0.8
        }}
      />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            width: deviceWidth,
            height: deviceHeight
          }}
        >
          <Image
            source={props.imgSrc}
            style={{
              top: deviceHeight / 2 - 150,
              alignSelf: 'center',
              backgroundColor: 'pink',
              width: 300,
              height: 300,
              borderRadius: 50
            }}
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
  // return (
  //   <TouchableOpacity
  //     style={{
  //       position: "absolute",
  //       left:
  //         ((deviceWidth - 20) * 7 / 8 - 65) / 24 * props.oneMealTime -
  //         (props.oneMealScore * 4.5 + 20) / 2 +
  //         32.5,
  //       width: props.oneMealScore * 4.5 + 20,
  //       height: props.oneMealScore * 4.5 + 20,
  //       borderRadius: 100,
  //       backgroundColor: circleColor,
  //       opacity: 0.8
  //     }}
  //   />
  // );
};
// 토글되면 열리는 그 곳
const WeeklyList = () => (
  <View style={wlST.container}>
    <View style={wlST.index}>
      <View style={{ flex: 1 }} />
      <View style={wlST.timeArea}>
        <Text style={wlST.timeText}>새벽 12시 </Text>
        <Text style={wlST.timeText}>🌞</Text>
        <Text style={wlST.timeText}> 낮 12시</Text>
        <Text style={wlST.timeText}>🌙</Text>
        <Text style={wlST.timeText}>밤 12시</Text>
      </View>
    </View>
    <View style={wlST.listContainer}>
      {/* 월요일.... */}
      <View style={wlST.day}>
        <View style={wlST.dayInfo}>
          <View style={wlST.dateAndScore}>
            <View style={wlST.date}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  lineHeight: 12,
                  color: gray.d,
                  opacity: 0.8
                }}
              >
                Mon
              </Text>
            </View>
            <View style={wlST.dayMealScore}>
              <Text style={wlST.drinksEmoji}>☕️☕️</Text>
              {/* <Text style={wlST.dayMealScoreText}>5</Text> */}
            </View>
          </View>
          {/* <View style={wlST.dayDrinks}>
              <Text style={wlST.drinksEmoji}>☕️☕️</Text>
            </View> */}
        </View>
        <View style={wlST.dayMealList}>
          <OneMealCircle
            oneMealScore="5"
            oneMealTime="6"
            mealType="a"
            imgSrc={require('../img/foodExample1.jpeg')}
          />
          <OneMealCircle
            oneMealScore="10"
            oneMealTime="11"
            mealType="b"
            imgSrc={require('../img/foodExample2.jpeg')}
          />
          <OneMealCircle
            oneMealScore="1"
            oneMealTime="17"
            mealType="c"
            imgSrc={require('../img/foodExample3.jpeg')}
          />
          <OneMealCircle
            oneMealScore="7"
            oneMealTime="22"
            mealType="d"
            imgSrc={require('../img/foodExample4.jpeg')}
          />
        </View>
      </View>
    </View>
  </View>
);

const Summary = props => {
  const [weeklyListState, setWeeklyListState] = useState({ on: false });
  const weeklyListToggle = () => {
    setWeeklyListState({ on: !weeklyListState.on });
    console.log(weeklyListState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.monthWeekButtonContiner}>
        <View style={styles.monthButton}>
          <Text style={styles.text}>11월</Text>
        </View>
        <Text style={wlST.weekDateText}>11.18 ~ 11.24 </Text>
        <View style={styles.weekButtonContainer}>
          <View style={styles.weekButton}>
            <Text style={styles.text}>1</Text>
          </View>
          <View style={styles.weekButton}>
            <Text style={styles.text}>2</Text>
          </View>
          <View style={styles.weekButton}>
            <Text style={styles.text}>3</Text>
          </View>
          <View style={styles.weekButton}>
            <Text style={styles.text}>4</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <ScrollView>
          <TouchableOpacity
            style={styles.summaryButton}
            onPress={weeklyListToggle}
          >
            {!weeklyListState.on && <WeeklyListOff />}
            {weeklyListState.on && <WeeklyList />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.summaryButton}>
            <Text style={styles.text}>
              WeeklyReport {'\n'}
              will be updated after 11.30
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.summaryButton}>
            <Text style={styles.text}>
              MonthlyList
              {'\n'}
              will be updated after 11.30
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.summaryButton}>
            <Text style={styles.text}>
              MonthlyReport {'\n'}
              will be updated after 11.30
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <NavBar navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F9F2'
  },
  monthWeekButtonContiner: {
    flex: 1,
    alignItems: 'center'
  },
  monthButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 30,
    marginBottom: 4,
    borderRadius: 100,
    backgroundColor: gray.c
  },
  weekButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    height: 100
  },
  weekButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 30,
    borderRadius: 100,
    backgroundColor: gray.a
  },
  buttonContainer: {
    flex: 9,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  summaryButton: {
    justifyContent: 'center',
    width: (deviceWidth * 7) / 7,
    marginBottom: 30,
    padding: 10,
    borderRadius: 50,
    // borderWidth: 5,
    // borderColor: '#F1F1F1',
    backgroundColor: gray.a

    // backgroundColor: '#7BB78E',
  },
  text: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '700',
    color: gray.b,
    textAlign: 'center'
  }
});

const wlST = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  index: {
    flex: 1,
    flexDirection: 'row'
  },
  weekDateText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20,
    color: gray.b
  },
  timeArea: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 1,
    paddingRight: 10
  },
  timeText: {
    fontSize: 12,
    lineHeight: 20,
    color: gray.b
  },
  listContainer: {
    flex: 15
  },
  day: {
    flexDirection: 'row',
    height: 55,
    marginBottom: 10
  },
  dayInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  date: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12,
    color: gray.b
  },
  dateAndScore: { flex: 2.5 },
  dayMealScore: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayMealScoreText: {
    fontWeight: '800',
    fontSize: 15,
    color: gray.c
  },
  dayDrinks: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: 'red',
  },
  drinksEmoji: {
    fontSize: 12,
    lineHeight: 13,
    textAlign: 'center'
  },
  dayMealList: {
    flex: 7,
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 20
  },
  dayInfo2: {
    flex: 1,
    backgroundColor: 'green'
  },
  dayMealList2: {
    flex: 3,
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  meal1: {
    position: 'absolute',
    left:
      ((((deviceWidth - 20) * 3) / 4 - 65) / 24) * 8 -
      (9 * 4.5 + 20) / 2 +
      32.5,
    width: 9 * 4.5 + 20,
    height: 9 * 4.5 + 20,
    borderRadius: 100,
    backgroundColor: 'pink'
  }
});

export default connect(state => ({
  file: state.meal.saved.file
}))(Summary);
