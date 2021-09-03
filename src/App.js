import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Notifications from 'react-notify-toast';

import Register from './components/Register';
import UpdateProfile from './components/UpdateProfile';
import ActivateAccount from './components/activateAccount';
import AccountWait from './components/AccountWait';
import Email from './tests/Email';
import Login from './components/Login';
import Homer from './components/Homer';
import ResetPassword from './components/ResetPassword';
//auths
import AuthService from "./services/auth.service";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {currentUser: undefined};
    this.Logout = this.Logout.bind(this);
  }
  componentDidMount(){
    const user = AuthService.getCurrentUser();
    console.log(user);
    if(user){
      this.setState({currentUser: user});
    }
  }
  //logout
  Logout(){
    AuthService.logout();
  }
  render(){
    //const {currentUser} = this.state;
    return (
      <Router>
        <Notifications/>
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/updateprofile" component={UpdateProfile} />
            <Route exact path="/confirm/:id" component={ActivateAccount} />
            <Route exact path="/activate_account" component={AccountWait} />
            <Route exact path="/testemail" component={Email} />
            <Route exact path="/login" component={Login} />
            <Route path="/homer" component={Homer} />
            <Route path="/resetpassword" component={ResetPassword} />
          </Switch>
      </Router>
    ); 
  }
}

export default App;
