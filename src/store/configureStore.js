import {createStore, applyMiddleware, compose} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from '../store';
import sagaMiddleware from '../sagas/middleware';
import rootSaga from '../sagas';

const configureStore = () => {
    const middlewares = [sagaMiddleware];
    const enhancer = compose(
      applyMiddleware(...middlewares)
    );

    const store = createStore(
      rootReducer,
      composeWithDevTools(enhancer)
    );
    // sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;