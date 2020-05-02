import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded'
import { toProperCase } from '../../utils/utils'
import { Link, useLocation } from 'react-router-dom'
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded'
import SyncAltRoundedIcon from '@material-ui/icons/SyncAltRounded'
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded'
import DescriptionIcon from '@material-ui/icons/Description'
import '../../App.css'


const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
    position: 'fixed',
    bottom: '0',
    right: '0',
  },
  exampleWrapper: {
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }
  },
  mainIcon: {
    color: 'white'
  },
  icon: {
    color: '#636363',
    paddingTop: '4px'
  }
}))


const AddFab: React.FC = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const location = useLocation()

  // Try adding location state
  // let clientId: number, projectId: number
  // /admin/clients
  // /admin/clients/1

  const getLinkData = (slug: string) => {
    const linkData: { pathname: string, state?: {} } = {
      pathname: `/admin/add/${slug}`
    }
    if(slug === 'client') { return linkData }

    const pathArr = location.pathname.split('/')
    const clientsIndex = pathArr.indexOf('clients')
    if (clientsIndex !== -1 && clientsIndex !== pathArr.length - 1) {
      const clientId = pathArr[clientsIndex + 1]
      linkData.state = { clientId }
    }

    return linkData
  }

  const actions = [
    { icon: <PersonAddRoundedIcon className={classes.icon} />, name: 'client' },
    { icon: <AssignmentRoundedIcon className={classes.icon} />, name: 'task' },
    { icon: <CreditCardRoundedIcon className={classes.icon} />, name: 'expense' },
    { icon: <SyncAltRoundedIcon className={classes.icon} />, name: 'transfer' },
    { icon: <DescriptionIcon className={classes.icon} />, name: 'contract' },
  ]

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="Add Fab"
          className={classes.speedDial}
          hidden={false}
          icon={<SpeedDialIcon className={classes.mainIcon} />}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          direction='up'
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={
                <Link to={getLinkData(action.name)} >
                  {/* Add state to link to use location state */}
                  {/* state: {clientId: 1, projectId: 1} */}
                  {action.icon}
                </Link>
              }
              tooltipTitle={toProperCase(action.name)}
              onClick={() => setOpen(false)}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  )
}

export default AddFab
