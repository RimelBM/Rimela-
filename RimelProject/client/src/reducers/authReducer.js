import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT ,
  USER_LOADED,
  USER_LOADING
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    pseudo:null
  }
  
  export default function(state = initialState, action) {
    const { type , payload} = action
  
    switch (type) {
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
          pseudo:payload.pseudo
        };
     
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
          token: payload.token,
          isAuthenticated: true,
          loading: false,
          user: null
          
        }

      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        
      case REGISTER_FAIL:
        localStorage.removeItem('token')
        return {

          token: null,
          user:null,
          isAuthenticated: false,
          loading: false
        }
      default: {
        return state
      }
    }
  }