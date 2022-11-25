import {combineReducers} from 'redux';
import amountReducer from './amountReducer'
import authenticateReducer from './authenticateReducer'

const reducers = combineReducers({
    amount: amountReducer,
    authenticate: authenticateReducer,
})

export default reducers;