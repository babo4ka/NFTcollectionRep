import {createStore, combineReducers} from 'redux'
import { collectionInteractReducer } from './collectionInteractReducer'
import { walletInteractReducer } from './walletInteractReducer'

const rootReducer = combineReducers({
    collectionInteractReducer,
    walletInteractReducer
})

export const store = createStore(rootReducer)