import { combineReducers } from "redux";
import auth from './auth';
import meal from './meal';

const rootReducer = combineReducers({
    auth,
    meal
});

export default rootReducer;