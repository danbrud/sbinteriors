import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import { Link, useLocation } from 'react-router-dom'
import { toProperCase } from '../utils/utils'
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { useUserStore } from '../context/User.context'
import smallLogo from '../assets/favicon-32x32.png'
import { AuthProps } from './AuthProps'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    color: 'white'
  },
  menuTitle: {
    margin: '15px 8px',
    color: '#424242',
    flexGrow: 1,

  },
  title: {
    color: 'white',
    flexGrow: 1,
  },
  homeIcon: {
    marginRight: theme.spacing(2),
    color: 'white',
    userSelect: 'none',
    padding: '2px'
  },
  bar: {
    backgroundColor: '#34495e',
  },
  list: {
    width: 250,
    backgroundColor: '#EAF2EF',
    height: '100vh'
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#34495e'
  },
  listItem: {
    margin: '5px 0'
  },
  img: {
    borderRadius: '5px'
  },
  logout: {
    color: 'white'
  }
}))


const MenuBar: React.FC<AuthProps> = (props) => {
  const classes = useStyles()
  const location = useLocation()
  const UserStore = useUserStore()

  const [title, setTitle] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const getTitle = () => {
    const path = location.pathname.split('/')
    let title: string

    if (isNaN(parseInt(path[path.length - 1])) && path[path.length - 1]) {
      title = toProperCase(path[path.length - 1])
    } else if (path[path.length - 2]) {
      title = toProperCase(path[path.length - 2])
      title = title.slice(0, title.length - 1)
    }

    setTitle(title || '')
  }

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setOpen(open)
  }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" className={classes.menuTitle} >
        Menu
      </Typography>
      <Divider />
      <List>
        {['Home', 'Settings'].map((text, index) => (
          <Link className={classes.link} key={text} to={text === 'Home' ? '/admin/clients' : '/admin/settings'}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>{index === 0 ? <HomeIcon /> : <SettingsIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )

  useEffect(() => {
    getTitle()
  }, [location])

  return (
    <div className={classes.root}>
      {/* <AppBar position="fixed">
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
        >
          {sideList()}
        </Drawer>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={toggleDrawer(true)}/>
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
      </AppBar> */}
      <AppBar position="fixed">
        <Toolbar>
          <Link to={UserStore.isAdmin ? '/admin/clients' : `/clients/${UserStore.clientId}`} >
            <IconButton edge="end" className={classes.homeIcon} color="inherit" aria-label="menu">
              <img className={classes.img} src={smallLogo} />
            </IconButton>
            {/* <IconButton edge="start" className={classes.homeIcon} color='inherit'>
              <HomeIcon />
            </IconButton> */}
          </Link>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Link to={UserStore.isAdmin ? '/admin/clients' : `/clients/${UserStore.clientId}`} >
            <Button
              className={classes.logout}
              onClick={() => props.auth.logout()}
            >
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuBar