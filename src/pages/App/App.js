import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import store from '../../store'
import MovieList from '../../components/MovieList'
import MovieDeleteModal from '../../components/modals/MovieDeleteModal'
import MovieEditModal from '../../components/modals/MovieEditModal'
import MovieAddModal from '../../components/modals/MovieAddModal'
import theme from './theme'

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <MovieList />
      <MovieDeleteModal />
      <MovieEditModal />
      <MovieAddModal />
    </Provider>
  </MuiThemeProvider>
)

export default App
