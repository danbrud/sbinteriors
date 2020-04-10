import React from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AdminHome from './components/Admin/Clients/AdminHome'
import ClientInfo from './components/Admin/Clients/ClientInfo'
import { ProjectsProvider } from './context/Projects.context'
import ProjectsList from './components/Admin/Projects/ProjectsList'
import { ProjectStore } from './stores/Projects.store'
import ProjectDetails from './components/Admin/Projects/ProjectDetails'


const App: React.FC = observer(() => {

  return (
    <Router>
      {window.location.pathname === '/' ? <Redirect to='/admin/clients' /> : null}
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
            <ProjectsList match={match}/>
          </ProjectsProvider>)}
      />
      <Route
        exact
        path='/admin/clients/:clientId/projects/:projectId'
        render={({ match }) => (
          <ProjectsProvider value={ProjectStore}>
            <ProjectDetails match={match}/>
          </ProjectsProvider>)}
      />
      <Route
        exact
        path='/admin/clients/:clientId/transfers'
        render={({ match }) => <AdminHome />}
      />
      {/* <Route exact path='/clients/:clientId/projects/:projectId' render={({ match }) => <ClientInfo match={match} />} /> */}
    </Router>
  )
})

export default App