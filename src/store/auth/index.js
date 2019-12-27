import produce from 'immer';
import { handleActions } from 'redux-actions';
import { loginAction } from './action';

const initialState = {
    user: {
        jwt_access_token: '',
        isLoggedIn: false,
    },
    loginStatus: 'INIT',
}

export default handleActions({
    [loginAction.request]: (state) => {
        return produce(state, draft => {
            draft.loginStatus = 'FETCHING'
        });
    },
    [loginAction.success]: (state) => {
        return produce(state, draft => {
            draft.loginStatus = 'SUCCESS'
            draft.user = {
                isLoggedIn: true,
            }
        });
    },
    [loginAction.failure]: (state) => {
        return produce(state, draft => {
            draft.loginStatus = 'FAILURE'
        });
    },
    [loginAction.logout]: (state) => {
        return produce(state, draft => {
            draft.loginStatus = 'INIT'
            draft.user = {
                isLoggedIn: false,
            }
        });
    },
}, initialState);