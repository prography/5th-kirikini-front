export const intialState = {
  hello: 'heeeeeeellllllllo~',
};

export const HELLO = 'HELLO';

export const loginRequestAction = data => ({
  type: HELLO,
  data,
});

const reducer = (state = intialState, action) => {
  return state;
};

export default reducer;