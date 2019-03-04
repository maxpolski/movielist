import { createSelector } from 'reselect'

const getAllMovies = state => state.movies

export const getMovieById = (movies, movieId) => movies.find(m => m.id === movieId)

export const getDataForMovieToDelete = createSelector(
  getAllMovies,
  state => state.ui.modals.movieToDeleteId,
  getMovieById,
)
export const getDataForMovieToEdit = createSelector(
  getAllMovies,
  state => state.ui.modals.movieToEditId,
  getMovieById,
)

export const getShownModal = state => state.ui.modals.shownModal
