import { createStore, combineReducers } from 'redux'
import members from './members'
import msgs from './msgs'
import socket from './socket'

const store = createStore(
  combineReducers({ members, msgs, socket })
)
console.log('store', store.getState())

export default store
