import config from '../config'

// eslint-disable-next-line
export const getMovies = () => {
  return Promise.all([
    fetch(`https://www.omdbapi.com/?t=The+Grand+Budapest+Hotel&apikey=${config.MOVIES_API_KEY}`).then(r => r.json()),
    fetch(`https://www.omdbapi.com/?t=isle+of+dogs&apikey=${config.MOVIES_API_KEY}`).then(r => r.json()),
    fetch(`https://www.omdbapi.com/?t=the+double&apikey=${config.MOVIES_API_KEY}`).then(r => r.json()),
  ])
}
