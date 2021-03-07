import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { NavBar } from '../components'
import { TaskReport, Friends, RecommandFD, MyInfo, Login, Logout, UserProfile, SearchResult, Landing, ViewProfile, ViewDivision,ChatUI } from '../pages'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookies from 'js-cookie'
import { Helmet } from 'react-helmet'

class App extends Component  {
  constructor(props) {
      super(props)

      this.state = {
          ifLogin: false,
      }
  }

  render(){
    return (
      <div>
      <Helmet>
                <title>AI Circle</title>
        </Helmet>
        <Router>
        { !Cookies.get('phone_number') &&
        <div>
        <Route path="/aic-landing" exact component={Landing} />
              <div class='Login'>
              <Route path="/" exact component={Landing} />
            <Route path="/login" exact component={Login} />
            </div>
            </div>
          }
            { Cookies.get('phone_number') &&
            <div>
            <NavBar />
            <Switch>
                <PrivateRoute path="/" exact component={TaskReport} />
                <PrivateRoute path="/viewprofile/:phone_number" exact component={ViewProfile} />
                <PrivateRoute path="/viewdivision/:phone_number" exact component={ViewDivision} />
                <PrivateRoute path="/searchResult/:searchKey" exact component={SearchResult} />
                <PrivateRoute path="/chatroom/:receiver" exact component={ChatUI} />
                <PrivateRoute path="/viewprofile/chatroom/:receiver" exact component={ChatUI} />
                <PrivateRoute path="/mytask" exact component={TaskReport} />
                <PrivateRoute path="/userProfile" exact component={UserProfile} />
                <PrivateRoute path="/friends" exact component={Friends} />
                <PrivateRoute path="/recommand" exact component={RecommandFD} />
                <PrivateRoute path="/myinfo" exact component={MyInfo} />
                <PrivateRoute path="/logout" exact component={Logout} />
            </Switch>
            </div>
          }
        </Router>
        </div>
    )
}
}
export default App
