import { createAction } from 'redux-actions'

import {
  SHOW_DELETE_MOVIE_MODAL,
  HIDE_DELETE_MOVIE_MODAL,
  SHOW_EDIT_MOVIE_MODAL,
  HIDE_EDIT_MOVIE_DATA_MODAL,
  SHOW_ADD_MOVIE_MODAL,
  HIDE_ADD_MOVIE_MODAL,
} from '../constants/modals'

export const showDeleteMovieModal = createAction(SHOW_DELETE_MOVIE_MODAL)
export const showEditMovieModal = createAction(SHOW_EDIT_MOVIE_MODAL)
export const showAddMovieModal = createAction(SHOW_ADD_MOVIE_MODAL)
export const hideDeleteMovieModal = createAction(HIDE_DELETE_MOVIE_MODAL)
export const hideEditMovieDataModal = createAction(HIDE_EDIT_MOVIE_DATA_MODAL)
export const hideAddMovieModal = createAction(HIDE_ADD_MOVIE_MODAL)
