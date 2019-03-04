import React from 'react'
import PropTypes from 'prop-types'
import { withProps } from 'recompose'
import { TextField } from 'redux-form-material-ui'
import { Field } from 'redux-form'
import MenuItem from '@material-ui/core/MenuItem'

import { required } from '../../../../../../../utils/validators'

const YearSelector = (props) => {
  const {
    startYear,
    endYear,
    classes,
  } = props

  const yearsArray = Array.from(new Array(endYear - startYear))

  return (
    <Field
      fullWidth
      select
      label="Year"
      validate={[required]}
      component={TextField}
      name="year"
      className={classes.inputField}
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
      {yearsArray.map((item, index) => {
        const value = startYear + index
        return (
          <MenuItem key={value} value={value.toString()}>
            {value}
          </MenuItem>
        )
      })}
    </Field>
  )
}

YearSelector.propTypes = {
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired,
  classes: PropTypes.shape({
    paper: PropTypes.string,
    inputField: PropTypes.string,
    errorLabel: PropTypes.string,
  }).isRequired,
}

export default withProps({
  startYear: 1900,
  endYear: 2019,
})(YearSelector)
