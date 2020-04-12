import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import { toProperCase } from '../../utils'
import { Link } from 'react-router-dom'
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import SyncAltRoundedIcon from '@material-ui/icons/SyncAltRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
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

  const actions = [
    { icon: <PersonAddRoundedIcon className={classes.icon} />, name: 'client' },
    { icon: <LocationCityRoundedIcon className={classes.icon} />, name: 'project' },
    { icon: <AssignmentRoundedIcon className={classes.icon} />, name: 'task' },
    { icon: <CreditCardRoundedIcon className={classes.icon} />, name: 'expense' },
    { icon: <SyncAltRoundedIcon className={classes.icon} />, name: 'transfer' },
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
                <Link to={{ pathname: `/admin/add/${action.name}`, state: {clientId: 1} }} >
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
