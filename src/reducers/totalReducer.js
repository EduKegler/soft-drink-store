import { INCREMENT_VALUE } from '../actions/actionTypes';
import { DECREMENT_VALUE } from '../actions/actionTypes';

const INITIAL_STATE = {
  total: 0
};

// REDUX - reducer responsavel por aumentar e diminuir o valor total 
export const totalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT_VALUE:
      return { ...state, total: state.total + action.payload }
    case DECREMENT_VALUE:
      return { ...state, total: state.total - action.payload }
    default:
      return state;
  }
};