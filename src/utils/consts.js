import { Platform } from 'react-native';

export const localhost = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2'

// localhost
// LoginScreen
export const EMAIL_URL = `http://${localhost}:8000/email_login`
export const KAKAO_URL = `http://${localhost}:8000/kakao_login`
export const FB_URL = `http://${localhost}:8000/facebook_login`
export const AUTO_URL = `http://${localhost}:8000/auto_login`

// SummaryScreen2
export const LOAD_MONTH_MEAL_URL = `http://${localhost}:8000/meal/month`

// HomeScreen
export const LOAD_MEALS_URL = `http://${localhost}:8000/meal/today`

// RateScreen
export const LOAD_RATE_MEAL_URL = `http://${localhost}:8000/rate/`

// UploadScreen
export const SAVE_MEAL_URL = `http://${localhost}:8000/meal/`

// // real server
// // LoginScreen
// export const EMAIL_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/email_login"
// export const KAKAO_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/kakao_login"
// export const FB_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/facebook_login"
// export const AUTO_URL = "http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/auto_login"

// // SummaryScreen2
// export const LOAD_MONTH_MEAL_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/month'

// HomeScreen
// export const LOAD_MEALS_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/today'

// RateScreen
// export const LOAD_RATE_MEAL_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/rate/'

// UploadScreen
// const SAVE_MEAL_URL = 'http://ec2-52-78-23-61.ap-northeast-2.compute.amazonaws.com/meal/'

