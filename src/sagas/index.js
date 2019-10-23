import { take } from 'redux-saga/effects'
import { HELLO } from '../reducers/user'

function* rootSaga() {
    while (true) {
        yield take(HELLO);
      }
}

export default rootSaga;
