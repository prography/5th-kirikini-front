import produce from 'immer';
import { handleActions } from 'redux-actions';
import { mealAction } from './action';

const initialState = {
    saved: { // CameraScreen에서 저장하는 식사 정보
        file: {},
        countType: null,
        mealType: null,
        gihoType: null,
        timestamp: null,
    },
    today: [], // 오늘 먹은 음식
    meals: [] // 해당 유저의 모든 meals
}

export default handleActions({
    [mealAction.today]: (state, action) => {
        let newToday = JSON.parse(JSON.stringify(state.meal.today));
        newToday.push(action.meal)

        console.log("action: ", action)
        return produce(state, draft => {
            draft.meals = {
                today: newToday
            }
        });
    },
    [mealAction.saved]: (state, action) => {
        console.log("action: ", action)
        return produce(state, draft => {
            draft.saved = {
                ...state.saved,
                file: action.file,
                timestamp: action.timestamp
            }
        });
    },
    [mealAction.mealType]: (state, action) => {
        console.log("action: ", action)
        return produce(state, draft => {
            draft.saved = {
                ...state.saved,
                mealType: action.mealType
            }
        });
    },
    [mealAction.gihoType]: (state, action) => {
        console.log("action: ", action)
        return produce(state, draft => {
            draft.saved = {
                ...state.saved,
                gihoType: action.gihoType
            }
        });
    },
    [mealAction.month_meal]: (state, action) => {
        console.log("action: ", action)
        return produce(state, draft => {
            draft.meals = action.meals
        });
    },
    [mealAction.meal_rate]: (state, action) => {
        console.log("action: ", action)
        return produce(state, draft => {
            draft.meals = action.meals
        });
    },
}, initialState);