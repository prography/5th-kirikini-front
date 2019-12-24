export const mealAction = {
    saga: 'MEAL_SAGA',
    today: 'MEAL_TODAY',
    saved: 'MEAL_SAVED',
    mealType: 'MEAL_TYPE',
    gihoType: 'GIHO_TYPE',
    month_meal: 'MONTH_MEAL'
};

export const mealSaga = () => ({
    type: mealAction.saga
});

export const mealToday = (meal) => ({
    type: mealAction.today,
    meal: meal
});

export const mealMonth = (meals) => ({
    type: mealAction.month_meal,
    meals: meals
});

export const mealSaved = (file, timestamp) => ({
    type: mealAction.saved,
    file: file,
    timestamp: timestamp
});

export const mealType = (data) => ({
    type: mealAction.mealType,
    mealType: data
});

export const gihoType = (data) => ({
    type: mealAction.gihoType,
    gihoType: data
});