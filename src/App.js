//import logo from './logo.svg';
//import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Register from './components/Register';
import UpdateProfile from './components/UpdateProfile';
import ActivateAccount from './components/activateAccount';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="navbrand-brand text-white font-weight-bold">MyTodo</div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/updateprofile" component={UpdateProfile} />
          <Route exact path="/activate_account" component={ActivateAccount} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
