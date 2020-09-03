import {combineReducers} from 'redux'


import authReducer from './authReducer'
import foodReducer from './foodReducer'
import alertReducer from './alertReducer'

export default combineReducers({
    food :foodReducer,
    alert: alertReducer,
    auth : authReducer
}) ;