import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { MOVIE_DELETE_MODAL } from '../../../store/constants/modals'
import { hideDeleteMovieModal as hideDeleteMovieModalAction } from '../../../store/actions/modals'
import { deleteMovie as deleteMovieAction } from '../../../store/actions/movies'
import { getDataForMovieToDelete } from '../../../store/selectors/ui'

import styles from './MovieDeleteModal.style'

const MovieDeleteModal = (props) => {
  const {
    hideDeleteMovieModal,
    shouldShow,
    deleteMovie,
    movie: {
      id,
    },
  } = props
  return (
    <Dialog open={shouldShow} onClose={() => {}}>
      <DialogTitle>Are you sure want to delete this movie?</DialogTitle>
      <DialogActions>
        <Button onClick={hideDeleteMovieModal} color="primary">
          No
        </Button>
        <Button
          onClick={() => {
            deleteMovie(id)
            hideDeleteMovieModal()
          }}
          color="primary"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

MovieDeleteModal.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  hideDeleteMovieModal: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  movie: PropTypes.objectOf({
    title: PropTypes.string,
    id: PropTypes.string,
    icon: PropTypes.string,
    director: PropTypes.string,
    runtime: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  shouldShow: state.ui.modals.shownModal === MOVIE_DELETE_MODAL,
  movie: getDataForMovieToDelete(state) || {},
})

const mapDispatchToProps = {
  hideDeleteMovieModal: hideDeleteMovieModalAction,
  deleteMovie: deleteMovieAction,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(MovieDeleteModal)
