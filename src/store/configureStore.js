import {createStore, applyMiddleware, compose} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
<<<<<<< HEAD
import rootReducer from '../reducers';
=======
import rootReducer from '../store';
>>>>>>> develop-1
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
<<<<<<< HEAD
    sagaMiddleware.run(rootSaga);
=======
    // sagaMiddleware.run(rootSaga);
>>>>>>> develop-1
    return store;
};

export default configureStore;