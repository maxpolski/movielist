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

import { getMovies as getMoviesAction } from '../../store/actions/movies'
import { showDeleteMovieModal as showDeleteMovieModalAction } from '../../store/actions/modals'

import styles from './MovieList.styles'

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

  render() {
    const {
      movies,
      classes,
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
                            {movie.title}
                          </Typography>
                          {movie.genre}
                        </>
                      )}
                      secondary={(
                        <>
                          <Typography component="span" color="textPrimary">
                            {`${movie.year}, ${movie.runtime}`}
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
                        onClick={() => {}}
                      >
                        <EditIco />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf({
    title: PropTypes.string,
    id: PropTypes.string,
    icon: PropTypes.string,
    director: PropTypes.string,
    runtime: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  classes: PropTypes.shape({ [PropTypes.string]: PropTypes.string }).isRequired,
  getMovies: PropTypes.func.isRequired,
  showDeleteMovieModal: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  movies: state.movies,
})

const mapDispatchToProps = {
  getMovies: getMoviesAction,
  showDeleteMovieModal: showDeleteMovieModalAction,
}

const enhancers = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhancers(MovieList)
