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

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  header: {
   textDecoration: 'underline'
  }
});

const createData = (service, includedHours, hoursCompleted) => {
  return { service, includedHours, hoursCompleted }
}

const Contract: React.FC = observer((props) => {
  const classes = useStyles()
  const { clientId } = useParams()
  const ClientsStore = useClientsStore()
  const GeneralAdminStore = useGeneralAdminStore()

  const [isLoading, setIsLoading] = useState(true)
  const [hasContract, setHasContract] = useState(true)

  const checkContract = async () => {
    if (await client.hasContract) {
      setIsLoading(false)
    } else {
      setHasContract(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (client) {
      checkContract()
    }
  }, [])


  const client = ClientsStore.getClient(clientId)
  return (
    !ClientsStore.isPopulated || !client
      ? <Redirect to={`/admin/clients/${clientId}`} />
      : isLoading
        ? <Loader />
        : !hasContract
          ? <NoData type='contract' />
          : (
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow className={classes.header}>
                    <TableCell >Service</TableCell>
                    <TableCell align="right">Hours Included</TableCell>
                    <TableCell align="right">Hours Completed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {client.contract
                    .map(c => (
                      createData(GeneralAdminStore.getService(c.serviceId).name, c.includedHours, 0)
                    ))
                    .map((row) => (
                      <TableRow key={row.name}>
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
  )
})

export default Contract