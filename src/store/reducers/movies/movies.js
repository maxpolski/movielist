import { handleActions } from 'redux-actions'

import { getMoviesCompleted, deleteMovie } from '../../actions/movies'
import { ADD_MOVIE_COMPLETED } from '../../constants/movies'

export default handleActions({
  [getMoviesCompleted]: (state, action) => [...action.payload],
  [deleteMovie]: (state, action) => state.filter(m => m.id !== action.payload),
  [ADD_MOVIE_COMPLETED]: (state, action) => [...state, action.payload],
}, [])
