import { all, fork, takeEvery, call } from 'redux-saga/effects';
import { KakaoLoginAction } from '../store/auth/action';
// import { kakao } from 'api/auth';

function* kakaoLogin(action) {
    try {
        // const data = yield call(kakao, action);
        yield put({
            type: KakaoLoginAction.success,
            data,
        })
    } catch (e) {
        yield put({
            type: KakaoLoginAction.failure,
        })
    }
}

function* watchKakaoLogin() {    
    yield takeEvery(KakaoLoginAction.saga, kakaoLogin);
}

export default function* authSaga() {
    yield all([fork(watchKakaoLogin)])
}