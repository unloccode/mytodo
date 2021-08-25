import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Notifications from 'react-notify-toast';

import Register from './components/Register';
import UpdateProfile from './components/UpdateProfile';
import ActivateAccount from './components/activateAccount';
import AccountWait from './components/AccountWait';
import Email from './tests/Email';
import Login from './components/Login';
import Homer from './components/Homer';
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
    const {currentUser} = this.state;
    return (
      <Router>
        <Notifications/>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbrand-brand text-white font-weight-bold">MyTodo</div>
            {
              currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <ul className="nav-link">{currentUser.email}</ul>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.Logout}>
                      Logout
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-lin">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">Sign Up</Link>
                  </li>
                </div>
              )
            }
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/updateprofile" component={UpdateProfile} />
            <Route exact path="/confirm/:id" component={ActivateAccount} />
            <Route exact path="/activate_account" component={AccountWait} />
            <Route exact path="/testemail" component={Email} />
            <Route exact path="/login" component={Login} />
            <Route path="/homer" component={Homer} />
          </Switch>
        </div>
      </Router>
    ); 
  }
}

export default App;
