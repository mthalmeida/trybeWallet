import { LOGIN_SUCESS } from '../actions/index';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_SUCESS:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
