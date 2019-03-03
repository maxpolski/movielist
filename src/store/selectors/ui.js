import { createSelector } from 'reselect'

// eslint-disable-next-line
export const getDataForMovieToDelete = createSelector(
  state => state.movies,
  state => state.ui.modals.movieToDeleteId,
  (movies, movieId) => movies.find(m => m.id === movieId),
)
