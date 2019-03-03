import { createAction } from 'redux-actions'

import {
  ADD_MOVIE,
  DELETE_MOVIE,
  GET_MOVIES,
  GET_MOVIES_COMPLETED,
} from '../constants/movies'

export const getMovies = createAction(GET_MOVIES)
export const getMoviesCompleted = createAction(GET_MOVIES_COMPLETED)

export const addMovie = createAction(ADD_MOVIE)

export const deleteMovie = createAction(DELETE_MOVIE)
