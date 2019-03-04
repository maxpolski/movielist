import { handleActions } from 'redux-actions'

import {
  getMoviesCompleted,
  deleteMovie,
  editMovie,
  addMovieCompleted,
} from '../../actions/movies'

export default handleActions({
  [getMoviesCompleted]: (state, action) => [...action.payload],
  [deleteMovie]: (state, action) => state.filter(m => m.id !== action.payload),
  [editMovie]: (state, action) => {
    const movieToEditIndex = state.findIndex(m => m.id === action.payload.id)
    return [
      ...state.slice(0, movieToEditIndex),
      {
        ...action.payload,
      },
      ...state.slice(movieToEditIndex + 1),
    ]
  },
  [addMovieCompleted]: (state, action) => [...state, action.payload],
}, [])
