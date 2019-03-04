import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withProps } from 'recompose'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import {
  Field,
  SubmissionError,
  reduxForm,
  reset as resetFormAction,
} from 'redux-form'
import Button from '@material-ui/core/Button'
import { TextField } from 'redux-form-material-ui'
import InputAdornment from '@material-ui/core/InputAdornment'

import { required, isUrl } from '../../../../../utils/validators'
import { getShownModal, getDataForMovieToEdit } from '../../../../../store/selectors/ui'
import { MOVIE_ADD_MODAL, MOVIE_EDIT_MODAL } from '../../../../../store/constants/modals'
import {
  editMovie as editMovieAction,
  addMovie as addMovieAction,
} from '../../../../../store/actions/movies'
import {
  hideEditMovieDataModal as hideEditMovieDataModalAction,
} from '../../../../../store/actions/modals'

import YearSelector from './components/YearSelector'
import GenresSelector from './components/GenresSelector'
import styles from '../../styles/MovieModal.style'

class MovieDataForm extends Component {
  handleSubmitClick = (values, dispatch, data) => {
    const {
      modalName,
      addMovie,
    } = this.props

    const {
      editMovie,
    } = data

    const isDuplicatingName = this.checkIsDuplicatingName(values.title, values.id)

    if (isDuplicatingName) {
      throw new SubmissionError({
        title: 'Title already exist!',
      })
    }

    if (modalName === MOVIE_EDIT_MODAL) {
      editMovie(values)
    }

    if (modalName === MOVIE_ADD_MODAL) {
      addMovie(values)
    }

    this.handleClose()
  }

  handleClose = () => {
    const {
      hideEditMovieDataModal,
      reset,
      modalName,
    } = this.props

    hideEditMovieDataModal()
    reset(modalName)
  }

  checkIsDuplicatingName = (newTitle, movieId) => {
    const {
      movies,
    } = this.props

    return movies.some((movie) => {
      const {
        title,
        id,
      } = movie

      return title.toLowerCase() === newTitle.toLowerCase() && id !== movieId
    })
  }

  render() {
    const {
      classes,
      handleSubmit,
      isShown,
      modalName,
    } = this.props

    const modalTitle = modalName === MOVIE_ADD_MODAL ? 'New Movie' : 'Edit Movie'

    return (
      <Modal open={isShown} onClose={this.handleClose}>
        <form className={classes.paper} onSubmit={handleSubmit(this.handleSubmitClick)}>
          <Typography variant="h6">
            {modalTitle}
          </Typography>
          <Field
            label="Title"
            fullWidth
            validate={[required]}
            component={TextField}
            name="title"
            type="text"
            className={classes.inputField}
            FormHelperTextProps={{
              className: classes.errorLabel,
            }}
          />
          <Field
            label="Poster"
            fullWidth
            validate={[required, isUrl]}
            component={TextField}
            name="icon"
            type="text"
            className={classes.inputField}
            FormHelperTextProps={{
              className: classes.errorLabel,
            }}
          />
          <YearSelector classes={classes} />
          <GenresSelector classes={classes} />
          <Field
            label="Runtime"
            fullWidth
            className={classes.inputField}
            component={TextField}
            validate={[required]}
            name="runtime"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
            FormHelperTextProps={{
              className: classes.errorLabel,
            }}
          />
          <Field
            fullWidth
            className={classes.inputField}
            component={TextField}
            validate={[required]}
            name="director"
            label="Director"
            type="text"
            FormHelperTextProps={{
              className: classes.errorLabel,
            }}
          />
          <DialogActions>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const movieToEditData = getDataForMovieToEdit(state)

  return ({
    movies: state.movies,
    isShown: getShownModal(state) === ownProps.modalName,
    initialValues: {
      ...state[ownProps.modalName],
      ...(ownProps.modalName !== MOVIE_ADD_MODAL && movieToEditData
        ? movieToEditData
        : ownProps.initialValues),
    },
  })
}

const mapDispatchToProps = {
  editMovie: editMovieAction,
  hideEditMovieDataModal: hideEditMovieDataModalAction,
  addMovie: addMovieAction,
  reset: resetFormAction,
}

const initialValues = {
  title: '',
  genre: [''],
  runtime: undefined,
  director: '',
  year: undefined,
}

MovieDataForm.propTypes = {
  modalName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    paper: PropTypes.string,
    inputField: PropTypes.string,
    errorLabel: PropTypes.string,
  }).isRequired,
  hideEditMovieDataModal: PropTypes.func.isRequired,
  addMovie: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    icon: PropTypes.string,
    director: PropTypes.string,
    runtime: PropTypes.number,
    genre: PropTypes.string,
    year: PropTypes.number,
  })).isRequired,
}

export default modalName => compose(
  withProps({
    initialValues,
    modalName,
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
  reduxForm({ form: modalName, enableReinitialize: true }),
)(MovieDataForm)
