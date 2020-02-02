<<<<<<< HEAD
import { take } from 'redux-saga/effects'
import { HELLO } from '../reducers/user'

function* rootSaga() {
    while (true) {
        yield take(HELLO);
      }
=======
import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';

function* rootSaga() {
    yield all([fork(authSaga)])
>>>>>>> develop-1
}

export default rootSaga;
