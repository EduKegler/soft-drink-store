import { totalReducer } from './totalReducer';
import { combineReducers } from 'redux';
import { loaderReducer } from './loaderReducer';
export const Reducers = combineReducers({
  totalState: totalReducer, loaderState: loaderReducer
});