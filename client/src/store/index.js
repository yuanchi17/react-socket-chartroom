import { createStore, combineReducers } from 'redux'
import members from './members'
import msgs from './msgs'

const store = createStore(
  combineReducers({ members, msgs })
)
console.log('store', store.getState())

export default store
