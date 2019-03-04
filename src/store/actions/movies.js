import { createAction } from 'redux-actions'

import {
  ADD_MOVIE,
  DELETE_MOVIE,
  GET_MOVIES,
  GET_MOVIES_COMPLETED,
  EDIT_MOVIE,
} from '../constants/movies'

export const getMovies = createAction(GET_MOVIES)
export const getMoviesCompleted = createAction(GET_MOVIES_COMPLETED)

export const editMovie = createAction(EDIT_MOVIE)

export const addMovie = createAction(ADD_MOVIE)

export const deleteMovie = createAction(DELETE_MOVIE)
