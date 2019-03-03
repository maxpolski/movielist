import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import store from '../../store'
import MovieList from '../../components/MovieList'
import MovieDeleteModal from '../../components/modals/MovieDeleteModal'
import theme from './theme'

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <MovieList />
      <MovieDeleteModal />
    </Provider>
  </MuiThemeProvider>
)

export default App
