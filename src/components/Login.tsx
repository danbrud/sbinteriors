import React, { useState } from 'react'
import { makeStyles, FormControl, TextField, Button, Snackbar } from '@material-ui/core'
import { AuthProps } from './AuthProps'
import { Redirect } from 'react-router-dom'
import { validateLoginInput, SERVER_URL } from '../utils/utils'
import MuiAlert from '@material-ui/lab/Alert'
import axios from 'axios'
import Loader from './Loader'
import { useUserStore } from '../context/User.context'
import logo from '../assets/android-chrome-192x192.png'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '95%',
    display: 'grid',
    justifyItems: 'center'
  },
  input: {
    margin: '4px 10px'
  },
  button: {
    marginTop: '10px',
    color: 'white'
  },
  img: {
    maxWidth: '150px'
  }
}))



const Login: React.FC<AuthProps> = (props) => {
  const classes = useStyles()
  const { auth } = props
  const UserStore = useUserStore()

  const [inputs, setInputs] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = React.useState(false)
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    severity: ''
  })

  const openSnackbar = (severity, message) => {
    setSnackbar({ message, severity, open: true })
  }

  const handleClose = () => {
    setSnackbar({
      message: '',
      open: false,
      severity: ''
    })
  }

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const login = async () => {
    const isValid = validateLoginInput(inputs).isValid
    if (!isValid) {
      return openSnackbar('error', 'Please enter a valid username and password!')
    }

    let res
    try {
      setIsLoading(true)
      res = await axios.post(`${SERVER_URL}/admin/login`, inputs)
    } catch (err) {
      setIsLoading(false)
      return openSnackbar('error', 'Incorrect username or password. Try again!')
    }

    const { token } = res.data
    auth.login(token)
    UserStore.setUser(auth.decodeToken())
    setIsLoading(false)
  }

  if (auth.isAuthenticated) {
    return (
      UserStore.isAdmin
        ? <Redirect to='/admin/clients'/>
        : <Redirect to={`/clients/${UserStore.clientId}`} />
    )
  }

  return (
    isLoading
      ? <Loader />
      : (
        <div>
          <FormControl className={classes.formControl}>
            <img className={classes.img} src={logo} />
            <TextField
              className={classes.input}
              required={true}
              label='Username'
              value={inputs.username}
              type='text'
              name='username'
              fullWidth={true}
              onChange={handleChange}
            />
            <TextField
              className={classes.input}
              required={true}
              label='Password'
              value={inputs.password}
              type='password'
              name='password'
              fullWidth={true}
              onChange={handleChange}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              fullWidth={true}
              onClick={login}
            >
              LOGIN
          </Button>
          </FormControl>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      )
  )
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Login