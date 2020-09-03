import axios from "axios"

import {GET_FOODS ,
	   FOOD_ERROR , 
	   FOODS_LOADING ,
	   ADD_FOOD ,
	   DELETE_FOOD,
	   ADD_COMMENT , 
	   DELETE_COMMENT,
	   LIKES_UPDATE} from './types'
 
import {tokenConfig, loadUser} from './authAction'


export const getFoods = () => async dispatch => {
	try {
        dispatch({type : FOODS_LOADING})

		const res = await axios.get('http://localhost:5000/food')
		dispatch({
			type: GET_FOODS,
			payload: res.data
		})
	} catch (error) {
		dispatch({
			type: FOOD_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}

export const addFood = formData => async (dispatch,getState) => {

	try {

	  dispatch({type : FOODS_LOADING})
	
	 
  
      const body = JSON.stringify(formData);
	  const res = await axios.post('http://localhost:5000/food', body ,tokenConfig(getState));
  
	  dispatch({
		type: ADD_FOOD,
		payload: res.data
	  });

	 
	  dispatch(getFoods())
	
	} catch (err) {
	  dispatch({
		type:FOOD_ERROR
	  });
	}
  };

  export const addComment = (id,formData) => async (dispatch,getState) => {
	try {
		
		const body = JSON.stringify(formData);

		const res= await axios.post(`http://localhost:5000/food/comment/${id}` , body , tokenConfig(getState) )

		console.log("your res " +res)

		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		})

	} catch (error) {
		dispatch({
			type: FOOD_ERROR
		})
	}
}




  export const likes = id => async (dispatch,getState) => {
	try {
		
		
	const res =	await axios.post(`http://localhost:5000/food/like/${id}`,tokenConfig(getState) )

	console.log("res : " + res)

		dispatch({
			type: GET_FOODS
		})

	} catch (error) {
		dispatch({
			type: FOOD_ERROR
		})
	}
} ;

  export const deleteFood = id => async (dispatch,getState) => {
	try {
		
		
	const res =	await axios.delete(`http://localhost:5000/food/${id}`,tokenConfig(getState) )

	console.log(res)

		dispatch({
			type: DELETE_FOOD,
			payload: id
		})

	} catch (error) {
		dispatch({
			type: FOOD_ERROR
		})
	}
} ;





export const unlikeFood = id => async (dispatch,getState) => {
	try {
		
		
		const res= await axios.put(`http://localhost:5000/food/unlike/${id}`,tokenConfig(getState) )

		dispatch({
			type: LIKES_UPDATE,
			payload: {id:id , likes:res.data}
		})

	} catch (error) {
		dispatch({
			type: FOOD_ERROR
		})
	}
}



export const deleteComment = (id,comment_id) => async (dispatch,getState) => {
	try {
		
	
		await axios.post(`http://localhost:5000/food/comment/${id}/${comment_id}`  , tokenConfig(getState) )

		dispatch({
			type: DELETE_COMMENT,
			payload: comment_id
		})

	} catch (error) {
		dispatch({
			type: FOOD_ERROR
		})
	}
}