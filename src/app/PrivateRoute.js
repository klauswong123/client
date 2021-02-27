import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Cookies from 'js-cookie'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn =Cookies.get('isLogin');
  console.log(isLoggedIn)
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login'}} />
        )
      }
    />
  )
}

export default  PrivateRoute
