import {
  takeEvery, call, put,
} from 'redux-saga/effects'
import createId from 'uniqid'

import { GET_MOVIES, ADD_MOVIE } from '../constants/movies'
import { getMoviesCompleted, addMovieCompleted } from '../actions/movies'
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

function* addMovieSaga(action) {
  const id = createId()

  yield put(addMovieCompleted({ ...action.payload, id }))
}

export default [takeEvery(GET_MOVIES, fetchMoviesSaga), takeEvery(ADD_MOVIE, addMovieSaga)]
