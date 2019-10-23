import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from '../reducers';
import sagaMiddleware from '../sagas/middleware';
import rootSaga from '../sagas';

const configureStore = () => {
    const middlewares = [sagaMiddleware];
    const enhancer = compose(
      applyMiddleware(...middlewares),
    );

    const store = createStore(rootReducer, enhancer)
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;