import { handleActions, combineActions } from 'redux-actions'

import {
  showDeleteMovieModal,
  hideDeleteMovieModal,
  showEditMovieModal,
  hideEditMovieDataModal,
  showAddMovieModal,
  hideAddMovieModal,
} from '../../../actions/modals'
import { MOVIE_DELETE_MODAL, MOVIE_EDIT_MODAL, MOVIE_ADD_MODAL } from '../../../constants/modals'

export default handleActions({
  [showAddMovieModal]: state => ({
    ...state,
    shownModal: MOVIE_ADD_MODAL,
  }),
  [showDeleteMovieModal]: (state, action) => ({
    ...state,
    shownModal: MOVIE_DELETE_MODAL,
    movieToDeleteId: action.payload,
  }),
  [showEditMovieModal]: (state, action) => ({
    ...state,
    shownModal: MOVIE_EDIT_MODAL,
    movieToEditId: action.payload,
  }),
  [combineActions(hideDeleteMovieModal, hideEditMovieDataModal, hideAddMovieModal)]: state => ({
    ...state,
    shownModal: '',
    movieToDeleteId: undefined,
    movieToEditId: undefined,
  }),
}, { shownModal: '', movieToDeleteId: undefined, movieToEditId: undefined })
