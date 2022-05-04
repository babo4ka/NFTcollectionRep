import {createStore, combineReducers} from 'redux'
import { interactReducer } from './interactReducer'

const rootReducer = combineReducers({
    interact:interactReducer,
})

export const store = createStore(rootReducer)