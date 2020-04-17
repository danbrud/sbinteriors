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
import { toProperCase } from '../../../utils'
import { useClientsStore } from '../../../context/Clients.context'
import '../../../styles/ClientDetailsList.css'
import { observer } from 'mobx-react'

const useStyles = makeStyles({
  row: {
    width: '100%',
    fontSize: '16px'
  },
  arrow: {

  }
})

// interface ClientDetailItemsProps {
//   clientId: string
// }

const ClientDetailItems: React.FC = observer(() => {
  const classes = useStyles()
  const ClientsStore = useClientsStore()
  const { clientId } = useParams()

  const client = ClientsStore.getClient(clientId)

  const getBackgroundColor = (balance: number) => balance >= 0 ? '#208f4e' : '#c0392b'

  const detailItems = ['tasks', 'expenses', 'transfers']

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {detailItems.map(item => (
            <TableRow key={item} >
              <Link to={`/admin/clients/${clientId}/${item}`}>
                <TableCell align="left" className={classes.row}>{toProperCase(item)}</TableCell>
                <TableCell >
                  {
                    item === 'tasks'
                      ? <span
                        className='badge'
                        style={{ backgroundColor: getBackgroundColor(client.taskBalance) }}
                      >
                        <i className="fas fa-shekel-sign" style={{ fontSize: '10px' }}></i> {Math.abs(client.taskBalance)}
                      </span>
                      : item === 'expenses'
                        ? <span
                        className='badge'
                        style={{ backgroundColor: getBackgroundColor(client.expenseBalance) }}
                      >
                        <i className="fas fa-shekel-sign" style={{ fontSize: '10px' }}></i> {Math.abs(client.expenseBalance)}
                      </span>
                        : null
                  }
                </TableCell>
                <TableCell align="right" className={classes.arrow}>
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