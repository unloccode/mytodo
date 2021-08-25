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

function App() {
  return (
    <Router>
      <Notifications/>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="navbrand-brand text-white font-weight-bold">MyTodo</div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/updateprofile" component={UpdateProfile} />
          <Route exact path="/confirm/:id" component={ActivateAccount} />
          <Route exact path="/activate_account" component={AccountWait} />
          <Route exact path="/testemail" component={Email} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
