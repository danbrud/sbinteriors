import React from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AdminHome from './components/Admin/Clients/AdminHome'
import ClientInfo from './components/Admin/Clients/ClientInfo'
import { ProjectsProvider } from './context/Projects.context'
import ProjectsList from './components/Admin/Projects/ProjectsList'
import { ProjectStore } from './stores/Projects.store'


const App: React.FC = observer(() => {

  return (
    <Router>
      {window.location.pathname === '/' ? <Redirect to='/admin' /> : null}
      <Route
        exact
        path='/admin'
        render={() => <AdminHome />}
      />
      <Route
        exact
        path='/clients/:clientId'
        render={({ match }) => <ClientInfo match={match} />}
      />
      <Route
        exact
        path='/clients/:clientId/projects'
        render={({ match }) => (
          <ProjectsProvider value={ProjectStore}>
            <ProjectsList match={match}/>
          </ProjectsProvider>)}
      />
      <Route
        exact
        path='/clients/:clientId/transfers'
        render={({ match }) => <AdminHome />}
      />
      {/* <Route exact path='/clients/:clientId/projects/:projectId' render={({ match }) => <ClientInfo match={match} />} /> */}
    </Router>
  )
})

export default App