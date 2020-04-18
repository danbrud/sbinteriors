import React, { useState, useEffect } from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect, useRouteMatch } from 'react-router-dom'
import AdminHome from './components/Admin/AdminHome'
import ClientInfo from './components/Admin/Clients/ClientInfo'
import { TasksProvider } from './context/Tasks.context'
import { TasksStore } from './stores/Tasks.store'
import MenuBar from './components/MenuBar'
import AddItem from './components/Admin/AddItem'
import AddFab from './components/Admin/AddFab'
import Tasks from './components/Admin/Tasks/Tasks'
import Expenses from './components/Admin/Expenses/Expenses'
import { ExpensesStore } from './stores/Expenses.store'
import { ExpensesProvider } from './context/Expenses.context'
import { TransfersProvider } from './context/Transfers.context'
import { TransfersStore } from './stores/Transfers.store'
import Transfers from './components/Admin/Transfers/Transfers'
import { useGeneralAdminStore } from './context/GeneralAdmin.context'
import Settings from './components/Admin/Settings'


const App: React.FC = observer(() => {
  const GeneralAdminStore = useGeneralAdminStore()

  useEffect(() => {
    GeneralAdminStore.getServicesFromDB()
  }, [])

  return (
    <Router>
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
          render={() => (
            <TasksProvider value={TasksStore}>
              <Tasks />
            </TasksProvider>
          )}
        />
        <Route
          exact
          path='/admin/clients/:clientId/transfers'
          render={() => (
            <TransfersProvider value={TransfersStore}>
              <Transfers />
            </TransfersProvider>
          )}
        />
        <Route
          exact
          path='/admin/clients/:clientId/expenses'
          render={() => (
            <ExpensesProvider value={ExpensesStore}>
              <Expenses />
            </ExpensesProvider>
          )}
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
        <AddFab />
        {/* <Route
            exact
            path='/admin/clients/:clientId/projects'
            render={({ match }) => (
              <ProjectsProvider value={ProjectStore}>
                <ProjectsList match={match} />
              </ProjectsProvider>)}
          /> */}
        {/* <Route
            exact
            path='/admin/clients/:clientId/projects/:projectId'
            render={({ match }) => (
              <ProjectsProvider value={ProjectStore}>
                <TasksProvider value={TasksStore}>
                  <ExpensesProvider value={ExpensesStore}>
                    <ProjectDetailsWrapper match={match} />
                  </ExpensesProvider>
                </TasksProvider>
              </ProjectsProvider>)}
          /> */}
      </div>
    </Router>
  )
})

export default App