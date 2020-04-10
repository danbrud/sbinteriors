import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ClientsProvider } from './context/Clients.context'
import { Clients } from './stores/Clients.store'

const ClientsStore = new Clients()

ReactDOM.render(
  <ClientsProvider value={ClientsStore}>
    <App />
  </ClientsProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()