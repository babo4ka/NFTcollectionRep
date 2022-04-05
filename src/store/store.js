import {createStore, combineReducers} from 'redux'
import { interactReducer } from './interactReducer'


const rootReducer = combineReducers({
    interactReducer
})

export const store = createStore(rootReducer)