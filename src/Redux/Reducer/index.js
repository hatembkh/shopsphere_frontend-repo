import {combineReducers} from 'redux'
import AuthReducer from './authReducer'
import ErrorReducer from './ErrorReducer'
import ProductReducer from './productReducer'
import CommandesReducer from './commandesReducer'


const rootReducer = combineReducers({AuthReducer, ErrorReducer, ProductReducer, CommandesReducer})

export default rootReducer