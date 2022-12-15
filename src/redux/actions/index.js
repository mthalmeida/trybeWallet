export const LOGIN_SUCESS = 'LOGIN_SUCESS';

export const CALL_REQUEST = 'CALL_REQUEST';
export const CALL_SUCESS = 'CALL_SUCESS';
export const CALL_ERROR = 'CALL_ERROR';

export const ADD_SUCESS = 'ADD_SUCESS';
export const ADD_REQUEST = 'ADD_REQUEST';
export const ADD_ERROR = 'ADD_ERROR';

export const DELETE_SUCESS = 'DELETE_SUCESS';

export const loginSuccess = ({ email }) => ({
  type: LOGIN_SUCESS,
  email,
});

export const callRequest = () => ({
  type: CALL_REQUEST,
  loading: true,
});

export const callError = (error) => ({
  type: CALL_ERROR,
  error,
});

export const callSucess = (payload) => ({
  type: CALL_SUCESS,
  payload,
});

export const addNewWallet = (todoList) => ({
  type: ADD_SUCESS,
  todoList,
});

export const requestNewWallet = () => ({
  type: ADD_REQUEST,
  loading: true,
});

export const errorNewWallet = (error) => ({
  type: ADD_ERROR,
  error,
});

export const deleteWallet = (id) => ({
  type: DELETE_SUCESS,
  id,
});

export default loginSuccess;
