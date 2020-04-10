import React from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AdminHome from './components/Admin/Clients/AdminHome'
import ClientDetails from './components/Admin/ClientDetails'


const App: React.FC = observer(() => {

  return (
    <Router>
      {window.location.pathname === '/' ? <Redirect to='/admin' /> : null}
      <Route exact path='/admin' render={() => <AdminHome />} />
      <Route exact path='/client/:id' render={({ match }) => <ClientDetails match={match} />} />
    </Router>
  )
})

export default App