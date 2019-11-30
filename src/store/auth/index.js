import produce from 'immer';
import { handleActions } from 'redux-actions';
import { KakaoLoginAction } from './action';

const initialState = {
    user: {
        jwt_access_token: '',
        isLoggedIn: false,
    },
    loginStatus: 'INIT',
}

export default handleActions({
    [KakaoLoginAction.request]: (state) => {
        produce(state, draft => {
            draft.loginStatus = 'FETCHING'
        });
    },
    [KakaoLoginAction.success]: (state, action) => {
        produce(state, draft => {
            draft.loginStatus = 'SUCCESS'
            draft.user = {
                ...action.payload,
                isLoggedIn: true,
            }
        });
    },
    [KakaoLoginAction.failure]: (state) => {
        produce(state, draft => {
            draft.loginStatus = 'FAILURE'
        });
    },
}, initialState);