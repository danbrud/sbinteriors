import React, { useEffect } from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import AdminHome from './components/Admin/AdminHome'
import ClientInfo from './components/Admin/Clients/ClientInfo'
import MenuBar from './components/MenuBar'
import AddItem from './components/Admin/AddItem'
import AddFab from './components/Admin/AddFab'
import Tasks from './components/Admin/Tasks/Tasks'
import Expenses from './components/Admin/Expenses/Expenses'
import Transfers from './components/Admin/Transfers/Transfers'
import { useGeneralAdminStore } from './context/GeneralAdmin.context'
import Settings from './components/Admin/Settings'
import { useTransfersStore } from './context/Transfers.context'
import { useTasksStore } from './context/Tasks.context'
import { useExpensesStore } from './context/Expenses.context'
import Contract from './components/Admin/Contracts/Contract'
import Login from './components/Login'
import { AuthProps } from './components/AuthProps'
import ProtectedRoute from './components/ProtectedRoute'
import { useClientsStore } from './context/Clients.context'
import { useUserStore } from './context/User.context'
import { Switch } from '@material-ui/core'
import NotFound from './components/NotFound'

const App: React.FC<AuthProps> = observer((props) => {
  const { auth } = props

  const GeneralAdminStore = useGeneralAdminStore()
  const TransfersStore = useTransfersStore()
  const TasksStore = useTasksStore()
  const ExpensesStore = useExpensesStore()
  const ClientsStore = useClientsStore()
  const UserStore = useUserStore()

  useEffect(() => {
    if (auth.isAuthenticated) {
      UserStore.setUser(auth.decodeToken())
    }
  }, [])

  useEffect(() => {
    GeneralAdminStore.getServicesFromDB()
    GeneralAdminStore.getTransferMethodsFromDB()
  }, [])

  const location = useLocation()
  useEffect(() => {
    const path = location.pathname.split('/')
    const i = path.indexOf('clients')

    if ((i === path.length - 1) || i === -1) {
      if (TransfersStore.isFullyPopulated) {
        TransfersStore.clearStore()
      }
      if (TasksStore.isPopulated) {
        TasksStore.clearStore()
      }
      if (ExpensesStore.isPopulated) {
        ExpensesStore.clearStore()
      }
    }

    if (path[1] === 'login') {
      if (ClientsStore.isPopulated) {
        ClientsStore.clearStore()
      }
    }
  }, [location])


  return (
    <div>
      {auth.isAuthenticated ? <MenuBar auth={auth} /> : null}
      {window.location.pathname === '/' ? <Redirect to='/login' /> : null}
      <div id='app-container'>
          <ProtectedRoute
            auth={auth}
            exact
            path='/admin/clients'
            component={AdminHome}
          />
          <ProtectedRoute
            auth={auth}
            exact
            path='/clients/:clientId'
            component={ClientInfo}
          />
          <ProtectedRoute
            auth={auth}
            exact
            path='/clients/:clientId/tasks'
            component={Tasks}
          />
          <ProtectedRoute
            auth={auth}
            exact
            path='/clients/:clientId/transfers'
            component={Transfers}
          />
          <ProtectedRoute
            auth={auth}
            exact
            path='/clients/:clientId/expenses'
            component={Expenses}
          />
          <ProtectedRoute
            auth={auth}
            exact
            path='/clients/:clientId/contract'
            component={Contract}
          />
          <ProtectedRoute
            auth={auth}
            exact
            path='/admin/add/:item'
            component={AddItem}
          />
          {/* <ProtectedRoute
            auth={auth}
            exact
            path='/admin/settings'
            component={Settings}
          /> */}
          <Route
            exact
            path='/login'
            render={() => <Login auth={auth} />}
          />
          {/* <Route path="*" render={() => <NotFound />}/> */}
        {UserStore.isAdmin ? <AddFab /> : null}
      </div>
    </div>
  )
})

export default App