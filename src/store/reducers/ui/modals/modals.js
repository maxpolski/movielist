import { handleActions, combineActions } from 'redux-actions'

import {
  showDeleteMovieModal,
  hideDeleteMovieModal,
} from '../../../actions/modals'
import { MOVIE_DELETE_MODAL } from '../../../constants/modals'

export default handleActions({
  [showDeleteMovieModal]: (state, action) => ({
    ...state,
    shownModal: MOVIE_DELETE_MODAL,
    movieToDeleteId: action.payload,
  }),
  [combineActions(hideDeleteMovieModal)]: state => ({
    ...state,
    shownModal: '',
    movieToDeleteId: undefined,
    movieToEditId: undefined,
  }),
}, { shownModal: '', movieToDeleteId: undefined, movieToEditId: undefined })
