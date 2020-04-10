import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  row: {
    width: '100%',
    fontSize: '16px'
  }
})

interface ClientDetailItemsProps {
  clientId: string
}

const ClientDetailItems: React.FC<ClientDetailItemsProps> = (props) => {
  const classes = useStyles()
  const detailItems = ['projects', 'transfers']

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {detailItems.map(item => (
            <TableRow key={item} >
                <Link to={`/clients/${props.clientId}/${item}`}>
                <TableCell align="left" className={classes.row}>{item[0].toUpperCase() + item.slice(1)}</TableCell>
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
}

export default ClientDetailItems