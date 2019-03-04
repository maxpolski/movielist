import {
  takeEvery, call, put,
} from 'redux-saga/effects'

import { GET_MOVIES } from '../constants/movies'
import { getMoviesCompleted } from '../actions/movies'
import { getMovies } from '../../api/movies'

function* fetchMoviesSaga() {
  const response = yield call(getMovies)

  const movies = response.map(data => ({
    id: data.imdbID,
    icon: data.Poster,
    title: data.Title,
    genre: data.Genre.split(', ').length ? data.Genre.split(', ')[0] : data.Genre,
    year: Number.parseInt(data.Year, 10),
    director: data.Director,
    runtime: Number.parseInt(data.Runtime.split(' ')[0], 10),
  }))

  yield put(getMoviesCompleted(movies))
}

export default [takeEvery(GET_MOVIES, fetchMoviesSaga)]
