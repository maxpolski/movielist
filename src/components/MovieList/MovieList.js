import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIco from '@material-ui/icons/Add'

import { getMovies as getMoviesAction } from '../../store/actions/movies'
import {
  showDeleteMovieModal as showDeleteMovieModalAction,
  showEditMovieModal as showEditMovieModalAction,
  showAddMovieModal as showAddMovieModalAction,
} from '../../store/actions/modals'

import styles from './MovieList.styles'

const transformTitle = (title) => {
  const removeSpecChars = sentence => sentence.split('').filter(c => /[A-Za-z0-9]+|\s/.test(c)).join('')
  const capitalize = sentence => sentence.split(' ').map(
    word => word.split('').map(l => l.toLowerCase()).join(''),
  ).map(
    word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`,
  ).join(' ')

  /* It could be written down with pipelines syntax in the following way
  * ```
  * title |> removeSpecChars |> capitalize
  * ```
  * but it requires the corresponding babel plugin
  * which in its turn requires react-app-rewired to be installed
  * as for me it is an overkill to add all these tools to enable one single feature
  */
  return compose(capitalize, removeSpecChars)(title)
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

        <div className="row flex-column">
          <Grid
            container
            spacing={24}
          >
            {movies.map(movie => (
              <Grid
                lg={3}
                md={4}
                sm={6}
                xs={12}
                item
                key={movie.id}
              >
                <Card>
                  <CardMedia
                    className={classes.media}
                    image={movie.icon || 'https://media.wired.com/photos/5b7350e75fc74d47846ce4e4/master/pass/Popcorn-869302844.jpg'}
                    title={`${movie.title} poster`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {transformTitle(movie.title)}
                    </Typography>
                    <Typography component="p">
                      Year:
                      {' '}
                      {movie.year}
                    </Typography>
                    <Typography component="p">
                      Runtime:
                      {' '}
                      {`${movie.runtime} min`}
                    </Typography>
                    <Typography component="p">
                      Genre:
                      {' '}
                      {movie.genre}
                    </Typography>
                    <Typography component="p">
                      Director:
                      {' '}
                      {movie.director}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={this.showEditMoviePopupHandler(movie.id)}
                      size="small"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={this.showDeleteMoviePopupHandler(movie.id)}
                      size="small"
                      color="primary"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <IconButton
            aria-label="Delete"
            className={classnames(classes.addBtn, 'ml-auto')}
            onClick={showAddMovieModal}
          >
            <AddIco />
          </IconButton>
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
