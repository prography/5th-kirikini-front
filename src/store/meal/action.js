export const mealAction = {
    saga: 'MEAL_SAGA',
    today: 'MEAL_TODAY',
    saved: 'MEAL_SAVED',
    mealType: 'MEAL_TYPE',
    gihoType: 'GIHO_TYPE'
};

export const mealSaga = () => ({
    type: mealAction.saga
});

export const mealToday = (meal) => ({
    type: mealAction.today,
    meal: meal
});

export const mealSaved = (file) => ({
    type: mealAction.saved,
    file: file,
});

export const mealType = (data) => ({
    type: mealAction.mealType,
    mealType: data
});

export const gihoType = (data) => ({
    type: mealAction.gihoType,
    gihoType: data
});