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
import MakePasswordChanges from './components/MakePasswordChanges';
import PasswordChangedSuccess from './components/PasswordChangedSuccess';
import ResetRequestSuccess from './components/ResetRequestSuccess';

class App extends React.Component{
  render(){
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
            <Route exact path="/accountsettings/:id" component={MakePasswordChanges} />
            <Route path="/pwdsuccess" component={PasswordChangedSuccess} />
            <Route path="/pwdrqsuccess" component={ResetRequestSuccess} />
          </Switch>
      </Router>
    ); 
  }
}

export default App;
