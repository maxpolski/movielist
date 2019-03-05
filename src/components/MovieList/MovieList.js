import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditIco from '@material-ui/icons/Edit'
import DeleteIco from '@material-ui/icons/Delete'
import AddIco from '@material-ui/icons/Add'

import { getMovies as getMoviesAction } from '../../store/actions/movies'
import {
  showDeleteMovieModal as showDeleteMovieModalAction,
  showEditMovieModal as showEditMovieModalAction,
  showAddMovieModal as showAddMovieModalAction,
} from '../../store/actions/modals'

import styles from './MovieList.styles'

const transformTitle = (title) => {
  const removeSpecChars = sentence => sentence.split('').filter(c => /\w|\s/.test(c)).join('')
  const capitalize = sentence => sentence.split(' ').map(
    word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`,
  ).join(' ')

  /* It could be written down with pipelines syntax in the following way
  * ```
  * title |> capitalize |> removeSpecChars
  * ```
  * but it requires the corresponding babel plugin
  * which in its turn requires react-app-rewired to be installed
  * as for me it is an overkill to add all these tools to enable one single feature
  */
  return compose(removeSpecChars, capitalize)(title)
}

class MovieList extends Component {
  componentDidMount() {
    const {
      getMovies,
    } = this.props

    getMovies()
  }

  showDeleteMoviePopupHandler = movieId => () => {
    const {
      showDeleteMovieModal,
    } = this.props

    showDeleteMovieModal(movieId)
  }

  showEditMoviePopupHandler = movieId => () => {
    const {
      showEditMovieModal,
    } = this.props

    showEditMovieModal(movieId)
  }

  render() {
    const {
      movies,
      classes,
      showAddMovieModal,
    } = this.props

    return (
      <div className={classnames(classes.root, 'container-fluid')}>
        <div className="row flex-wrap justify-content-center">
          <div className="col-xs-12 col-sm-8">
            <div className="row flex-column">
              <List className={classnames(classes.list, 'col-12')}>
                {movies.map(movie => (
                  <ListItem key={movie.id} className={classes.listItem}>
                    <ListItemAvatar>
                      <Avatar alt={`${movie.title} poster`} src={movie.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={(
                        <>
                          <Typography variant="h6" color="textPrimary">
                            {
                              transformTitle(movie.title)
                            }
                          </Typography>
                          {movie.genre}
                        </>
                      )}
                      secondary={(
                        <>
                          <Typography component="span" color="textPrimary">
                            {`${movie.year}, ${movie.runtime} min`}
                          </Typography>
                          {movie.director}
                        </>
                      )}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={this.showDeleteMoviePopupHandler(movie.id)}
                      >
                        <DeleteIco />
                      </IconButton>
                      <IconButton
                        onClick={this.showEditMoviePopupHandler(movie.id)}
                      >
                        <EditIco />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <IconButton
                aria-label="Delete"
                className={classnames(classes.addBtn, 'ml-auto')}
                onClick={showAddMovieModal}
              >
                <AddIco />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    icon: PropTypes.string,
    director: PropTypes.string,
    runtime: PropTypes.number,
    genre: PropTypes.string,
    year: PropTypes.number,
  })).isRequired,
  classes: PropTypes.shape({ [PropTypes.string]: PropTypes.string }).isRequired,
  getMovies: PropTypes.func.isRequired,
  showDeleteMovieModal: PropTypes.func.isRequired,
  showEditMovieModal: PropTypes.func.isRequired,
  showAddMovieModal: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  movies: state.movies,
})

const mapDispatchToProps = {
  getMovies: getMoviesAction,
  showDeleteMovieModal: showDeleteMovieModalAction,
  showEditMovieModal: showEditMovieModalAction,
  showAddMovieModal: showAddMovieModalAction,
}

const enhancers = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhancers(MovieList)
