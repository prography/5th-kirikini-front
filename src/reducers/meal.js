export const intialState = {
    file: {}
};

export const SAVE_FILE = 'SAVE_FILE'

export const saveFile = data => ({
    type: SAVE_FILE,
    data,
});

export const reducer = (state = intialState, action) => {
    switch(action.type) {
        case SAVE_FILE:
            return {
                file: action.data,
            }
            break;

        default:
            return state;
            break;
    }
};