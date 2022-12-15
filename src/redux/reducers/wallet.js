import {
  CALL_REQUEST,
  CALL_SUCESS,
  CALL_ERROR,
  ADD_SUCESS,
  ADD_REQUEST,
  ADD_ERROR,
  DELETE_SUCESS,
} from '../actions/index';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case CALL_SUCESS:
    return {
      currencies: action.payload,
      expenses: [],
      loading: false,
    };
  case CALL_ERROR:
    return {
      ...state,
    };
  case CALL_REQUEST:
    return {
      ...state,
      loading: action.loading,
    };
  case ADD_REQUEST:
    return {
      loading: action.loading,
    };
  case ADD_SUCESS:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.todoList,
      ],
    };
  case ADD_ERROR:
    return {
      state,
    };
  case DELETE_SUCESS:
    return {
      ...state,
      expenses: action.id,
    };
  default:
    return state;
  }
};

export default wallet;
