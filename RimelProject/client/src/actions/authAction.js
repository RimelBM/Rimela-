import axios from 'axios'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL

} from './types'

import {setAlert} from './alertAction'

export const loadUser = () => async (dispatch,getState)  => {
	try {
		 // User loading
		 dispatch({ type: USER_LOADING });

	  const res = await axios.get('http://localhost:5000/auth/user' , tokenConfig(getState) );
  
	  dispatch({
		type: USER_LOADED,
		payload: res.data
	  });
	}
	 catch (err) {

	  dispatch({
		type: AUTH_ERROR
	  });
	}
  };


export const register = formData => async (dispatch) => {
	
	

	try {
		dispatch({ type: USER_LOADING });
	
		const config = {
			headers: {
			  "Content-Type": "application/json",
			},
		  };
	  
		const body = JSON.stringify(formData);
		
		const res = await axios.post('http://localhost:5000/auth/register', body , config)
        console.log(res);
		dispatch({
			type: REGISTER_SUCCESS,
			payload:res.data
			
		})
		console.log(res.data)

		dispatch(loadUser());

	
	} catch (err) {

		console.log(err.response)
		
		dispatch(
			setAlert(err.response.data, err.response.status, 'REGISTER_FAIL')
		  );
	   
		
		dispatch({
			type: REGISTER_FAIL
		})
	}
}

// Login User
export const login = formData => async dispatch => {
	
  
	try {
		dispatch({ type: USER_LOADING });
		
	  const config = {
			headers: {
			  "Content-Type": "application/json",
			},
		  };
	  
	  const body = JSON.stringify(formData);

	  const res = await axios.post('http://localhost:5000/auth/login', body , config);
  
	  dispatch({
		type: LOGIN_SUCCESS,
		payload: res.data
	  });

	  console.log(res.data)
  
	  dispatch(loadUser());
	} catch (err) {
	

	  dispatch({
		type: LOGIN_FAIL
	  });
	}
  };

  export const logout = () => {
	return {
	  type: LOGOUT
	};
  };
  
  // Setup config/headers and token
  export const tokenConfig = getState => {
	// Get token from localstorage
	const token = getState().auth.token;
	//console.log('token : ' +token)
  
	// Headers
	const config = {
	  headers: {
		'Content-type': 'application/json'
	  }
	};
  
	// If token, add to headers
	if (token) {
	  config.headers['auth-token'] = token;
	}
  
	return config;
  };