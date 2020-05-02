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
import Contract from './components/Admin/Clients/Contract'
import Login from './components/Login'
import { AuthProps } from './components/AuthProps'

const App: React.FC<AuthProps> = observer((props) => {
  const GeneralAdminStore = useGeneralAdminStore()
  const TransfersStore = useTransfersStore()
  const TasksStore = useTasksStore()
  const ExpensesStore = useExpensesStore()

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
  }, [location])

  return (
    <div>
      <MenuBar />
      {window.location.pathname === '/' ? <Redirect to='/admin/clients' /> : null}
      <div id='app-container'>
        <Route
          exact
          path='/admin/clients'
          render={() => <AdminHome />}
        />
        <Route
          exact
          path='/admin/clients/:clientId'
          render={() => <ClientInfo />}
        />
        <Route
          exact
          path='/admin/clients/:clientId/tasks'
          render={() => <Tasks />}
        />
        <Route
          exact
          path='/admin/clients/:clientId/transfers'
          render={() => <Transfers />}
        />
        <Route
          exact
          path='/admin/clients/:clientId/expenses'
          render={() => <Expenses />}
        />
        <Route
          exact
          path='/admin/clients/:clientId/contract'
          render={() => <Contract />}
        />
        <Route
          exact
          path='/admin/add/:item'
          render={() => <AddItem />}
        />
        <Route
          exact
          path='/admin/settings'
          render={() => <Settings />}
        />
        <Route
          exact
          path='/login'
          render={() => <Login auth={props.auth}/>}
        />
        <AddFab />
      </div>
    </div>
  )
})

export default App