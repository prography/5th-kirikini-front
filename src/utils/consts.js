import { Platform, Dimensions } from 'react-native';

export const localhost = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2'

// // localhost
// // Login
// export const EMAIL_URL = `http://${localhost}:8000/email_login`
// export const KAKAO_URL = `http://${localhost}:8000/kakao_login`
// export const FB_URL = `http://${localhost}:8000/facebook_login`
// export const AUTO_URL = `http://${localhost}:8000/auto_login`

// // Summary
// export const LOAD_MONTH_MEAL_URL = `http://${localhost}:8000/meal/month`

// // Home
// export const LOAD_MEALS_URL = `http://${localhost}:8000/meal/today`
// export const LOAD_YESTERDAY_RATING_URL = `http://${localhost}:8000/meal/yesterday_rating`

// // Rate
// export const RATE_MEAL_URL = `http://${localhost}:8000/rate/`

// // Upload
// export const SAVE_MEAL_URL = `http://${localhost}:8000/meal/`

// Setting
// export const PRIVACY_URL = `http://${localhost}:8000/privacy/`



// real server
// Login
export const EMAIL_URL = "http://13.124.158.62/email_login"
export const KAKAO_URL = "http://13.124.158.62/kakao_login"
export const FB_URL = "http://13.124.158.62/facebook_login"
export const AUTO_URL = "http://13.124.158.62/auto_login"

// Summary
export const LOAD_MONTH_MEAL_URL = 'http://13.124.158.62/meal/month'

// Home
export const LOAD_MEALS_URL = 'http://13.124.158.62/meal/today'
export const LOAD_YESTERDAY_RATING_URL = `http://13.124.158.62/meal/yesterday_rating`

// Rate
export const RATE_MEAL_URL = 'http://13.124.158.62/rate/'

// Upload
export const SAVE_MEAL_URL = 'http://13.124.158.62/meal/'

// Setting
export const PRIVACY_URL = `http://13.124.158.62/privacy/`



// Device
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


// Colors
export const kiriColor = '#F2F9F2';
export const gray = {
    m: '#F2F9F2',
    a: '#EAEAEA',
    b: '#B7B7B7',
    c: '#898989',
    d: '#505151'
};
export const yellow = {
    a: '#FCDB3A',
    b: '#F9CD15'
};
export const meal = {
    a: '#C8BAE5',
    b: '#AFEAA2',
    c: '#AFCAF2',
    d: '#9CD8C8'
};
export const mealColor = {
    a: '#C8BAE5',
    b: '#AFEAA2',
    c: '#AFCAF2',
    d: '#9CD8C8'
};


// Ments
export const MENTS = {
    0: [
      '"이렇게 먹을거면 차라리 굶는게 낫겠다"',
      '"너 그러다 쓰러져"',
      '"내가 물만 마셔도 너보다 건강하겠다"',
    ],
    1: [
      '"지금처럼 먹다가는 위장염, 간염 그리고 훅 가염.."',
      '"도대체 뭘 먹고 다니는거니?"'
    ],
    2: [
      '"이번 주만 벌써 몇 번째 고기야?(니 인생은 완전 고기서 고기야)"',
      '"너는 초록색 음식을 더 많이 먹어야 해! 어..? 거기 칭따오 내려놔"'
    ],
    3: [
      '"지금처럼 먹다가는 니 몸무게 앞자리가 달라지는 경험을 하게 될거야"',
      '"다른건 다 포기해도 건강은 포기하면 안돼!"',
      '"배달의 민족이 진짜 우리 민족은 아니야.."',
      '"더 먹을까 말까 할 때는 더 먹지 말자!"',
      '"하루는 보통 3끼라는거 알고 있지?"'
    ],
    4: [
      '"음식에 기름기랑 소금기 좀 빼자.. 나 웃음기 뺐다.."',
      '"이제 우리도 관리가 필요한 나이야"',
      '"탄수화물/단백질/채소는 1:1:2 비율이 좋대! 그런데 너는 왜 10:10:2인거니?"'
    ],
    5: [
      '"이미 너무 멀리 왔어"',
      '"조금만 더 분발하자"',
      '"조금만 더 건강하게 먹으면 끼리니가 칭찬해줄게!"'
    ],
    6: [
      '"짝짝짝! 술로부터 간을 구하셨습니다!"',
      '"오늘은 제법 무난하게 먹었네?"'
    ],
    7: [
      '"궁디팡팡"',
      '"건강도가 많이 올랐어!"'
    ],
    8: [
      '"모든 사람이 너처럼 먹으면 좋을텐데"',
    ],
    9: [
      '"완벽해"',
      '"건강하면 뭐든지 할 수 있어"',
      '"건강 식단 아주 칭찬해"',
      '"Health is wealth, 고로 너는 부자야!"'
    ]
  }