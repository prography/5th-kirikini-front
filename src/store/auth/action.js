export const loginAction = {
    saga: 'LOGIN_SAGA',
    request: 'LOGIN_REQUEST',
    success: 'LOGIN_SUCCESS',
    failure: 'LOGIN_FAILURE',
    logout: 'LOGOUT'
};

export const loginSaga = () => ({
    type: loginAction.saga
});

export const loginRequest = () => ({
    type: loginAction.request
});

export const loginSuccess = () => ({
    type: loginAction.success
});

export const loginFailure = () => ({
    type: loginAction.failure
});

export const logout = () => ({
    type: loginAction.logout
});
