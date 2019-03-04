import React from 'react'
import PropTypes from 'prop-types'
import { withProps } from 'recompose'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import MenuItem from '@material-ui/core/MenuItem'

import { required } from '../../../../../../../utils/validators'

const GenresSelector = (props) => {
  const {
    genresList,
    classes,
  } = props

  return (
    <Field
      fullWidth
      select
      multiple
      label="Genre"
      className={classes.inputField}
      validate={[required]}
      component={TextField}
      name="genre"
      FormHelperTextProps={{
        className: classes.errorLabel,
      }}
      SelectProps={{
        MenuProps: {
          MenuListProps: {
            className: classes.yearSelectList,
          },
        },
      }}
    >
      {
        genresList.map(value => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))
      }
    </Field>
  )
}


GenresSelector.propTypes = {
  genresList: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.shape({
    paper: PropTypes.string,
    inputField: PropTypes.string,
    errorLabel: PropTypes.string,
  }).isRequired,
}

export default withProps({
  genresList: [
    'Absurdist/surreal/whimsical',
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Fantasy',
    'Historical',
    'Historical fiction',
    'Horror',
    'Magical realism',
    'Mystery',
    'Paranoid Fiction',
    'Philosophical',
    'Political',
    'Romance',
    'Saga',
    'Satire',
    'Science fiction',
    'Social',
    'Speculative',
    'Thriller',
    'Urban',
    'Western',
    'Animation',
  ],
})(GenresSelector)
