import { INCREMENT_VALUE, DECREMENT_VALUE } from './actionTypes';

export const incrementTotal = value => ({
  type: INCREMENT_VALUE,
  payload: value
});
export const decrementTotal = value => ({
  type: DECREMENT_VALUE,
  payload: value
}); 