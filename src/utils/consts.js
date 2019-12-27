import { Platform, Dimensions } from 'react-native';

export const localhost = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2'

// // localhost
// // LoginScreen
// export const EMAIL_URL = `http://${localhost}:8000/email_login`
// export const KAKAO_URL = `http://${localhost}:8000/kakao_login`
// export const FB_URL = `http://${localhost}:8000/facebook_login`
// export const AUTO_URL = `http://${localhost}:8000/auto_login`

// // SummaryScreen2
// export const LOAD_MONTH_MEAL_URL = `http://${localhost}:8000/meal/month`

// // HomeScreen
// export const LOAD_MEALS_URL = `http://${localhost}:8000/meal/today`

// // RateScreen
// export const LOAD_RATE_MEAL_URL = `http://${localhost}:8000/rate/`

// // UploadScreen
// export const SAVE_MEAL_URL = `http://${localhost}:8000/meal/`



// real server
// LoginScreen
export const EMAIL_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/email_login"
export const KAKAO_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/kakao_login"
export const FB_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/facebook_login"
export const AUTO_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/auto_login"

// SummaryScreen2
export const LOAD_MONTH_MEAL_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/month'

// HomeScreen
export const LOAD_MEALS_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/today'

// RateScreen
export const LOAD_RATE_MEAL_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/rate/'

// UploadScreen
export const SAVE_MEAL_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/'


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