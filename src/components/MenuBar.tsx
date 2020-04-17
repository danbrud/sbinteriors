import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import { Link, useLocation } from 'react-router-dom'
import { toProperCase } from '../utils'


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

interface MenuBar {
  setSideMenuOpen: (open: boolean) => void
}

const MenuBar: React.FC<MenuBar> = (props) => {
  const classes = useStyles()
  const location = useLocation()
  const [title, setTitle] = useState<string>('')

  const getTitle = () => {
    const path = location.pathname.split('/')
    let title: string

    if (isNaN(parseInt(path[path.length - 1])) && path[path.length - 1]) {
      title = toProperCase(path[path.length - 1])
    } else if(path[path.length - 2]) {
      title = toProperCase(path[path.length - 2])
      title = title.slice(0, title.length - 1)
    }

    setTitle(title || '')
  }

  useEffect(() => {
    getTitle()
  }, [location])

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={() => props.setSideMenuOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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