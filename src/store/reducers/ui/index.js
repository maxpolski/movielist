import { combineReducers } from 'redux'

import modalsReducer from './modals'

export default combineReducers({
  modals: modalsReducer,
})
