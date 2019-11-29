import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import NavBar from '../Components/NavBar';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const kiri = {
  a: '#D3E0AA',
  b: '#B5DCA4',
  c: '#7BB78E',
  d: '#549286',
  e: '#3B656F',
  p: '#FF8603'
};

const gray = {
  a: 'white',
  b: '#B0B0B0',
  c: '#6F6F6F',
  d: '#404040'
};

const todayScore = 5.7;
const kiriColor = '#F2F9F2';

const AddOneCapsule = props => (
  <View style={capsuleSt.capsuleContainer}>
    <View
      style={{
        width: 7,
        height: 7,
        marginBottom: 8,
        borderRadius: 100,
        backgroundColor: props.beingRated ? kiri.p : kiriColor
      }}
    />
    <Text style={capsuleText.mealTime}>{props.oneMealtime}</Text>
    <View
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: deviceWidth / 4,
        height: deviceHeight / 4.9,
        marginBottom: 6,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: gray.a,
        borderRadius: 100,
        backgroundColor: props.beingRated ? gray.a : props.oneCapsuleColor,
        opacity: props.beingRated ? 0.7 : 1
      }}
    >
      <Text
        style={{
          marginBottom: 15,
          opacity: props.beingRated ? 0.5 : 1,
          fontSize: 30,
          fontWeight: '500',
          color: props.beingRated ? kiriColor : gray.a
        }}
      >
        {props.oneMealScore}
      </Text>
      <Image style={capsuleSt.circlePhoto} source={props.imgSrc} />
    </View>
  </View>
);

const HomeScreen = props => {
  const [capsule, setCapsule] = useState(0);

  const renderCapsule = () => {
    const capsules = [];

    for (let i = 0; i < capsule; i++) {
      capsules.push(
        <AddOneCapsule
          oneMealtime="9:12 am"
          oneMealScore="2.8"
          oneCapsuleColor={kiri.b}
          beingRated={false}
          imgSrc={require('../img/foodExample1.jpeg')}
        />
      );
    }
    return capsules;
  };

  const today = (
    <>
      <View style={universalSt.container}>
        <View style={universalSt.topHalf}>
          <View style={balloonSt.container}>
            <View style={balloonSt.balloon}>
              <View style={balloonSt.topBar}>
                <Text style={balloonText.title}>오늘 건강도</Text>
                <Text style={balloonText.todayScore}>{todayScore}</Text>
              </View>
              <View style={balloonSt.scoreCompareArea}>
                <Text style={balloonText.scoreCompare}>▲ 1.2</Text>
              </View>
              <View style={balloonSt.lastMealTimeContainer}>
                <View style={balloonSt.lastMealIconWrapper}>
                  <Text style={balloonText.lastMealTime}>
                    🍽 :{'\n'}
                    🍺 :{'\n'}
                    ☕️ :{'\n'}
                  </Text>
                </View>
                <View style={balloonSt.lastMealTimeWrapper}>
                  <Text style={balloonText.lastMealTime}>
                    1시간 58분
                    {'\n'}
                    254시간
                    {'\n'}
                    31시간
                    {'\n'}
                  </Text>
                </View>
              </View>
              <View style={balloonSt.feedbackArea}>
                <Text style={balloonText.feedback}>
                  zwon님의 현재 건강도는... {todayScore}
                  점! {'\n'}
                  나보다 잘 먹네... {'\n'}
                  대체 뭘 먹은거야?
                </Text>
              </View>
            </View>
            <View style={balloonSt.tailContainer}>
              <View style={balloonSt.tailWhiteArea} />
              <View style={balloonSt.tailKiriColorArea} />
              <Image
                style={balloonSt.kirini}
                source={require('../img/kiriniC.png')}
              />
            </View>
          </View>
        </View>
      </View>
      <NavBar />
    </>
  );
  return today;
};

// 공통적으로 쓰일? View 스타일 (화면 분할 등)
const universalSt = StyleSheet.create({
  container: {
    flex: 9,
    flexDirection: 'column',
    backgroundColor: kiriColor
  },
  topHalf: {
    flex: 1.5,
    flexDirection: 'row'
  },
  bottomHalf: {
    flex: 1
  }
});

// 좌측 상단 네비게이션 바의 View 스타일
const navSt = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: deviceWidth / 10
  },
  navButton: {
    width: deviceWidth / 6,
    height: deviceWidth / 9,
    marginBottom: deviceWidth / 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderStyle: 'solid',
    // borderWidth: 3,
    // borderColor: gray.a,
    borderRadius: 15,
    backgroundColor: gray.a,
    opacity: 0.3
  }
});

// 하얀 말풍선 속 Text 스타일
const balloonText = StyleSheet.create({
  title: {
    fontSize: 27,
    lineHeight: 35,
    fontWeight: '700',
    color: kiriColor
  },
  todayScore: {
    fontSize: 35,
    lineHeight: 35,
    fontWeight: '700',
    color: kiri.p
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
  kirini: {
    width: (deviceWidth * 3) / 10,
    height: deviceWidth / 4,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});

// 끼니캡슐들 속 Text 스타일
const capsuleText = StyleSheet.create({
  mealTime: {
    marginBottom: 9,
    opacity: 0.8,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
  }
  // mealScore:{
  //   marginBottom: 20,
  //   fontSize: 30,
  //   fontWeight: '500',
  //   color: 'white',
  // },
});

// 끼니캡슐들 속 View 스타일
const capsuleSt = StyleSheet.create({
  container: {
    flex: 2.8,
    backgroundColor: kiriColor
  },
  containerInsideScrollView: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  containerFirstMargin: {
    width: deviceWidth / 5
  },
  capsuleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: deviceWidth / 4,
    marginRight: deviceWidth / 10
  },
  // capsule: {
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   width: deviceWidth / 4,
  //   height: deviceHeight / 4.8,
  //   marginBottom: 6,
  //   borderStyle: 'solid',
  //   borderWidth: 2,
  //   borderColor: 'white',
  //   borderRadius: 100,
  //   backgroundColor: kiriColor,
  // },
  // beingRated: {
  //   width: 7,
  //   height: 7,
  //   marginBottom: 8,
  //   borderRadius: 100,
  //   backgroundColor: kiri.p,
  // },
  // 사진은 여기선 굳이 풀로 보여줄 필요 없으니까 cover로 하고,
  // 평가받는 쪽에선 정사각형 프레임 만들어서 contain으로 담으면 될 듯
  circlePhoto: {
    alignSelf: 'center',
    width: deviceWidth / 4.7,
    height: deviceWidth / 4.7,
    marginBottom: 4,
    borderRadius: 100,
    backgroundColor: kiriColor,
    opacity: 0.8,
    resizeMode: 'cover'
  }
});

// 하단 바... + 버튼이 있는 곳의 View와 Text 스타일
const bottomBarSt = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  addMealButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  addMealButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth / 6,
    height: deviceWidth / 6,
    borderStyle: 'solid',
    borderColor: gray.a,
    borderWidth: 3,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: gray.a,
    opacity: 1
  },
  addMealButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: kiriColor
  },
  buttonTailWhiteArea: {
    width: 30,
    height: 30,
    backgroundColor: gray.a
  },
  buttonTailKiricolorArea: {
    position: 'absolute',
    left: deviceWidth / 6,
    width: 40,
    height: 55,
    borderBottomLeftRadius: 50,
    backgroundColor: kiriColor
  }
});

export default HomeScreen;
