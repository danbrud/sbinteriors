import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { observer } from 'mobx-react'
import { useParams, Redirect } from 'react-router-dom'
import { useClientsStore } from '../../../context/Clients.context'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'
import Loader from '../../Loader'
import NoData from '../NoData'
import { useTasksStore } from '../../../context/Tasks.context'
import { convertDurationToString } from '../../../utils/utils'
import { useUserStore } from '../../../context/User.context'
import { Card, CardContent, Button, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import '../../../styles/Contract.css'
import { FormattedNumber } from 'react-intl'


const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  root: {
    width: '100%',
    marginBottom: '10px',
  },
  contentContainer: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    alignItems: 'center'
  },
  heading: {
    // flexBasis: '33.33%',
    // flexShrink: 0,
    fontSize: '18px'
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: '14px'
  },
  headText: {
    color: 'white',
    fontSize: '16px'
  }
}))


const Contract: React.FC = observer((props) => {
  const classes = useStyles()
  const { clientId } = useParams()

  const ClientsStore = useClientsStore()
  const GeneralAdminStore = useGeneralAdminStore()
  const TasksStore = useTasksStore()
  const UserStore = useUserStore()

  const [isLoading, setIsLoading] = useState(true)
  const [hasContract, setHasContract] = useState(true)

  const checkContract = async () => {
    if (await client.hasContract) {
      await populateTasks()
      setIsLoading(false)
    } else {
      setHasContract(false)
      setIsLoading(false)
    }
  }

  const populateTasks = async () => {
    if (!TasksStore.isPopulated) {
      await TasksStore.getTasksFromDB(clientId)
    }
  }

  useEffect(() => {
    if (client) {
      checkContract()
    }
  }, [])

  const createData = (service, includedHours, hoursCompleted) => {
    return { service, includedHours, hoursCompleted }
  }

  const client = UserStore.isAdmin ? ClientsStore.getClient(clientId) : UserStore.client
  return (
    !client
      ? <Redirect to={`/clients/${clientId}`} />
      : isLoading
        ? <Loader />
        : !hasContract
          ? <NoData type='contract' />
          : (
            <div id='contract-container'>
              <Card className={classes.root}>
                <CardContent className={classes.contentContainer}>
                  <Typography className={classes.heading}>
                    Price Per Hour: <span id='price'>
                      <i
                        className="fas fa-shekel-sign"
                        style={{ fontSize: '12px', color: '#757575' }}>
                      </i> <FormattedNumber value={client.pricePerHour} />
                    </span>
                  </Typography>
                  {
                    UserStore.isAdmin
                      ? <Button className={classes.secondaryHeading}>
                        <EditIcon />
                      </Button>
                      : null
                  }
                </CardContent>
              </Card >
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow className={classes.header}>
                      <TableCell className={classes.headText}>Service</TableCell>
                      <TableCell align="right" className={classes.headText}>Hrs Inc.</TableCell>
                      <TableCell align="right" className={classes.headText}>Hrs Used</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {client.contract
                      .map(c => (
                        createData(
                          GeneralAdminStore.getService(c.serviceId).name,
                          c.includedHours,
                          convertDurationToString(TasksStore.getTotalTimeOfService(c.serviceId))
                        )
                      ))
                      .map((row) => (
                        <TableRow key={row.service}>
                          <TableCell component="th" scope="row">
                            {row.service}
                          </TableCell>
                          <TableCell align="right">{row.includedHours}</TableCell>
                          <TableCell align="right">{row.hoursCompleted}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )
  )
})

export default Contract