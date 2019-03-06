import config from '../config'

// eslint-disable-next-line
export const getMovies = () => {
  const moviesTitles = [
    'The Grand Budapest Hotel',
    'isle of dogs',
    'the double',
    'moonrise kingdom',
    'star wars',
    'Inglourious Basterds',
    'kill bill',
    'django unchained',
  ]

  return Promise.all(
    moviesTitles.map(m => m.split(' ').join('+')).map(
      m => fetch(`https://www.omdbapi.com/?t=${m}&apikey=${config.MOVIES_API_KEY}`).then(r => r.json()),
    ),
  )
}
