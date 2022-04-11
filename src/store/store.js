import {createStore, combineReducers} from 'redux'
import { interactReducer } from './interactReducer'
import { rebusReducer } from './rebusReducer'

const rootReducer = combineReducers({
    interactReducer,
    rebusReducer
})

export const store = createStore(rootReducer)