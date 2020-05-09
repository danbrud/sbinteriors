import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { convertDurationToString } from '../../../utils/utils'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core'
import { Client } from '../../../stores/Client.store'
import { useGeneralAdminStore } from '../../../context/GeneralAdmin.context'
import { useTasksStore } from '../../../context/Tasks.context'

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  headText: {
    color: 'white',
    fontSize: '16px'
  }
}))

interface ContractTableProps {
  client: Client
}

const ContractTable: React.FC<ContractTableProps> = observer((props) => {
  const classes = useStyles()
  const TasksStore = useTasksStore()
  const GeneralAdminStore = useGeneralAdminStore()
  const { client } = props

  const createData = (service, includedHours, hoursCompleted) => {
    return { service, includedHours, hoursCompleted }
  }

  return (
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
  )
})

export default ContractTable