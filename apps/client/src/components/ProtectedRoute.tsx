import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthProps } from './AuthProps'

interface ProtectedRouteProps extends AuthProps {
  component?: any
  exact?: any
  path?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const props = { ...rest }

  return (
    <Route {...props} render={() => {
      if (props.auth.isAuthenticated) {
        return <Component {...props} />
      } else {
        return <Redirect to='/login' />
      }
    }}
    />
  )
}

export default ProtectedRoute