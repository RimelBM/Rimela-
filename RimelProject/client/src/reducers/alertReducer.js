  
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';


const initialState = {
  msg: {},
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case REMOVE_ALERT:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}