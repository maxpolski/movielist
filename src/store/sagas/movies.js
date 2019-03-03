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
    genre: data.Genre,
    year: data.Year,
    director: data.Director,
    runtime: data.Runtime,
  }))

  yield put(getMoviesCompleted(movies))
}

export default [takeEvery(GET_MOVIES, fetchMoviesSaga)]
