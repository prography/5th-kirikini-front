export const KakaoLoginAction = {
    saga: 'KAKAO_LOGIN_SAGA',
    request: 'KAKAO_LOGIN_REQUEST',
    success: 'KAKAO_LOGIN_SUCCESS',
    failure: 'KAKAO_LOGIN_FAILURE',
};

export const kakaoLoginSaga = () => ({
    type: KakaoLoginAction.saga
});
