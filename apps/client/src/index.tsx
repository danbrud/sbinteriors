import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { ClientsProvider } from './context/Clients.context'
import { ClientsStore } from './stores/Clients.store'
import { ThemeProvider } from '@material-ui/core'
import { mainTheme } from './themes/main.theme'
import { GeneralAdminProvider } from './context/GeneralAdmin.context'
import { GeneralAdminStore } from './stores/GeneralAdmin'
import { TasksProvider } from './context/Tasks.context'
import { TasksStore } from './stores/Tasks.store'
import { TransfersProvider } from './context/Transfers.context'
import { TransfersStore } from './stores/Transfers.store'
import { ExpensesProvider } from './context/Expenses.context'
import { ExpensesStore } from './stores/Expenses.store'
import { IntlProvider } from 'react-intl'
import { Auth } from './utils/Auth'
import { UserProvider } from './context/User.context'
import { UserStore } from './stores/User.store'

const auth = new Auth()

ReactDOM.render(
  <Router>
    <IntlProvider locale={'heb'} >
      <ThemeProvider theme={mainTheme}>
        <UserProvider value={UserStore}>
          <ClientsProvider value={ClientsStore}>
            <GeneralAdminProvider value={GeneralAdminStore}>
              <TasksProvider value={TasksStore}>
                <TransfersProvider value={TransfersStore}>
                  <ExpensesProvider value={ExpensesStore}>
                    <App auth={auth} />
                  </ExpensesProvider>
                </TransfersProvider>
              </TasksProvider>
            </GeneralAdminProvider>
          </ClientsProvider>
        </UserProvider>
      </ThemeProvider>
    </IntlProvider>
  </Router>,
  document.getElementById('root')
)

serviceWorker.register()