import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ClientsProvider } from './context/Clients.context'
import { ClientsStore } from './stores/Clients.store'
import { ThemeProvider } from '@material-ui/core'
import { mainTheme } from './themes/main.theme'
import { GeneralAdminProvider } from './context/GeneralAdmin.context'
import { GeneralAdminStore } from './stores/GeneralAdmin'


ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <ClientsProvider value={ClientsStore}>
      <GeneralAdminProvider value={GeneralAdminStore}>
        <App />
      </GeneralAdminProvider>
    </ClientsProvider>
  </ThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()