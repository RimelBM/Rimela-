import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, status , id)  => {
 
   return{
     type: SET_ALERT ,
     payload: {msg, status, id}
   }
  }


   export const clearAlert = () => {
    return {
      type: REMOVE_ALERT
    };
  };
