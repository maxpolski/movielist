import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import movies from './movies'
import ui from './ui'

export default combineReducers({
  form: formReducer,
  movies,
  ui,
})
