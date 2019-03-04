export default theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: 200,
    left: `calc(50% - ${theme.spacing.unit * 50 / 2}px)`,
    [theme.breakpoints.down('sm')]: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 'auto',
    },
  },
  yearSelectList: {
    maxHeight: 400,
    padding: 0,
  },
  inputField: {
    marginBottom: 15,
    marginTop: 15,
  },
  errorLabel: {
    position: 'absolute',
    bottom: -18,
  },
})
