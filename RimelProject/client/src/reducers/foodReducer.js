import {GET_FOODS , FOOD_ERROR, FOODS_LOADING ,ADD_FOOD ,DELETE_FOOD,ADD_COMMENT,DELETE_COMMENT,LIKES_UPDATE} from '../actions/types'

const initialState = {
    posts : [] ,
    post : null , 
    loading : false
}


export default function(state = initialState, action){

    const { type, payload } = action;

    switch (type) {
		
		case GET_FOODS:
			return {
				...state,
				posts: payload,
				loading: false
            }

        case ADD_FOOD:
            return{
              ...state,
              posts :[payload, ...state.posts],
              loading:false
              
            }
        case DELETE_FOOD:
            return{
                ...state,
                loading : false ,
                posts : state.posts.filter(post => post._id !== payload)
            }    
        case FOODS_LOADING:
            return {
                ...state,
                    
                posts: state.posts ,
                loading: true
                }
        
        case FOOD_ERROR:
            return{
                ...state , 
                loading: false
            }

        case LIKES_UPDATE:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post
                  ),
                loading: false
            };

        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
                };

        case DELETE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(
                    comment => comment._id !== payload)
                      },
                loading: false
                    };

        default : return state
            
    }
}