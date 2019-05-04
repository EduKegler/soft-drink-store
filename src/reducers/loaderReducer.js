import { SHOW_LOADER } from '../actions/actionTypes';

const INITIAL_STATE = {
  loader: true
};

// REDUX - reducer responsavel por aumentar e diminuir o valor total 
export const loaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loader: action.payload }
    default:
      return state;
  }
};