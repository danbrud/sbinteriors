import React from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect, useRouteMatch } from 'react-router-dom'
import AdminHome from './components/Admin/AdminHome'
import ClientInfo from './components/Admin/Clients/ClientInfo'
import { ProjectsProvider } from './context/Projects.context'
import ProjectsList from './components/Admin/Projects/ProjectsList'
import { ProjectStore } from './stores/Projects.store'
import ProjectDetailsWrapper from './components/Admin/Projects/ProjectDetailsWrapper'
import { TasksProvider } from './context/Tasks.context'
import { TasksStore } from './stores/Tasks.store'
import { ExpensesProvider } from './context/Expenses.context'
import { ExpensesStore } from './stores/Expenses.store'
import MenuBar from './components/MenuBar'
import AddItem from './components/Admin/AddItem'
import { ClientsProvider } from './context/Clients.context'
import AddFab from './components/Admin/AddFab'


const App: React.FC = observer(() => {

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
          render={({ match }) => <ClientInfo match={match} />}
        />
        <Route
          exact
          path='/admin/clients/:clientId/projects'
          render={({ match }) => (
            <ProjectsProvider value={ProjectStore}>
              <ProjectsList match={match} />
            </ProjectsProvider>)}
        />
        <Route
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
        />
        <Route
          exact
          path='/admin/clients/:clientId/projects/:projectId/tasks'
          render={({ match }) => (
            <TasksProvider value={TasksStore}>
              <ProjectDetailsWrapper match={match} />
            </TasksProvider>
          )}
        />
        <Route
          exact
          path='/admin/clients/:clientId/transfers'
          render={() => <AdminHome />}
        />
        <Route
          exact
          path='/admin/add/:item'
          render={() => <AddItem />}
        />
        <AddFab />
      </div>
    </Router>
  )
})

export default App