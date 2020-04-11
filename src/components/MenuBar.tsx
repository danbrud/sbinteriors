import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import { Link, useLocation } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white'
  },
  title: {
    color: 'white',
    flexGrow: 1,
  },
  homeIcon: {
    color: 'white',
    userSelect: 'none'
  }
}))

const MenuBar: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()
  const [title, setTitle] = useState<string>('')

  const getTitle = () => {
    const path = location.pathname.split('/')
    let title: string

    if (isNaN(parseInt(path[path.length - 1]))) {
      title = path[path.length - 1]
      title = title[0].toUpperCase() + title.slice(1).toLowerCase()
    } else {
      title = path[path.length - 2]
      title = title[0].toUpperCase() + title.slice(1, title.length - 1).toLowerCase()
    }

    setTitle(title)
  }

  useEffect(() => {
    getTitle()
  }, [location])

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Link to='/admin/clients'>
            <IconButton edge="end" className={classes.homeIcon} color='inherit'>
              <HomeIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuBar