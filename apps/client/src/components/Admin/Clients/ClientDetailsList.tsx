import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { Link, useParams } from 'react-router-dom'
import { toProperCase } from '../../../utils/utils'
import { useClientsStore } from '../../../context/Clients.context'
import '../../../styles/ClientDetailsList.css'
import { observer } from 'mobx-react'
import BalanceTag from '../BalanceTag'
import { useUserStore } from '../../../context/User.context'

const useStyles = makeStyles({
  row: {
    width: '100%',
    fontSize: '16px'
  },
  container: {
    marginBottom: '10px'
  }
})

// interface ClientDetailItemsProps {
//   clientId: string
// }

const ClientDetailItems: React.FC = observer(() => {
  const classes = useStyles()
  const { clientId } = useParams()
  const ClientsStore = useClientsStore()
  const UserStore = useUserStore()

  const client = UserStore.isAdmin ? ClientsStore.getClient(clientId) : UserStore.client

  const detailItems = ['tasks', 'expenses', 'transfers', 'contract']

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table>
        <TableBody>
          {detailItems.map(item => (
            <TableRow key={item} >
              <Link to={`/clients/${clientId}/${item}`}>
                <TableCell align="left" className={classes.row}>{toProperCase(item)}</TableCell>
                <TableCell >
                  {
                    item === 'tasks'
                      ? <BalanceTag balance={client.tasksBalance} />
                      : item === 'expenses'
                        ? <BalanceTag balance={client.expensesBalance} />
                        : null
                  }
                </TableCell>
                <TableCell align="right">
                  <ArrowForwardIosIcon />
                </TableCell>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export default ClientDetailItems