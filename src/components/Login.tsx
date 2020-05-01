import React, { useState } from 'react'
import { makeStyles, FormControl, TextField, Button } from '@material-ui/core'

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

const Login: React.FC = () => {
  const classes = useStyles()
  const [inputs, setInputs] = useState({ username: '', password: '' })

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }

  const login = () => {
    console.log(inputs)
  }

  return (
    <FormControl className={classes.formControl}>
      <img
        className={classes.img}
        src={`${window.location.origin}/assets/android-chrome-192x192.png`}
      />
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
  )
}

export default Login