import { createAction } from 'redux-actions'

import {
  SHOW_DELETE_MOVIE_MODAL,
  HIDE_DELETE_MOVIE_MODAL,
} from '../constants/modals'

export const showDeleteMovieModal = createAction(SHOW_DELETE_MOVIE_MODAL) // eslint-disable-line
export const hideDeleteMovieModal = createAction(HIDE_DELETE_MOVIE_MODAL) // eslint-disable-line
