import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { observer } from 'mobx-react'
import { Client } from '../../../stores/Client.store'

const useStyles = makeStyles((theme) => ({
  buttonOutlined: {
    marginBottom: '8px',
  },
  button: {
    color: 'white'
  }
}))

interface ClientActionButtonsProps {
  setShowPopup: (show: boolean) => void
  client: Client
  openSnackbar?: (severity: string, message: string) => void
}

const ClientActionButtons: React.FC<ClientActionButtonsProps> = observer((props) => {
  const classes = useStyles()
  const { setShowPopup, client, openSnackbar } = props

  const updateStatus = () => {
    client.updateClient('isComplete', !client.isComplete)
  }

  const generateReport = async () => {
    try {
      await client.generateReport()
    } catch (e) {
      return openSnackbar('error', 'Something wen wrong when generating the report. Please try again!')
    }
    return openSnackbar('success', 'Report generated! Check your email to view the report.')
  }

  return (
    <div>
      < Button
        className={classes.buttonOutlined}
        variant="outlined"
        color="primary"
        fullWidth={true}
        onClick={() => setShowPopup(true)}
      >
        TRANSFER BALANCE
      </ Button>
      <Button
        className={classes.buttonOutlined}
        fullWidth={true}
        variant='outlined'
        color='primary'
        onClick={updateStatus}
      >
        {client.isComplete ? 'Mark In Progress' : 'Mark Completed'}
      </Button>
      <Button
        className={classes.button}
        fullWidth={true}
        variant='contained'
        color='primary'
        onClick={generateReport}
      >
        GENERATE REPORT
      </Button>
    </div>
  )
})

export default ClientActionButtons