import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import Client from './ClientCard'
import { useClientsStore } from '../../../context/Clients.context'
import { mainTheme } from '../../../themes/main.theme'
import { ThemeProvider, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch'
//     }
//   }
// }))

const Clients: React.FC = observer(() => {
  const [input, setInput] = useState<string>('')
  const ClientsStore = useClientsStore()
  // const classes = useStyles()

  useEffect(() => {
    ClientsStore.getClients()
  }, [])

  return (
    <div>
      <ThemeProvider theme={mainTheme}>
        <TextField fullWidth={true} label="Search Clients" onChange={e => setInput(e.target.value)}/>
      </ThemeProvider>
      {
        ClientsStore.clients
          .filter(c => `${c.firstName.toLowerCase()} ${c.lastName.toLowerCase()}`.includes(input.toLowerCase()))
          .map(client => <Client key={client.id} client={client} />)
      }
    </div>
  )
})

export default Clients