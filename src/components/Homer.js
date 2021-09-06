import React from 'react';
import AuthService from '../services/auth.service';
import mytodoLogo from '../respictures/mytodologo.png';

export default class Homer extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentUser: AuthService.getCurrentUser()};
        this.Logout = this.Logout.bind(this);
    }
    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if(user){
            console.log(user);
            this.setState({currentUser: user});
        }
    }
    Logout(){
        AuthService.logout();
    }
    render(){
        const {currentUser} = this.state;
        return(
            <div>
                {
                    currentUser ? (
                        <div className="container-fluid">
                            <div className="row">
                                <nav className="col-sm-12 navbar" style={{backgroundColor: 'black'}} >
                                    <div className="navbar-brand">
                                        <img src={mytodoLogo} alt="eye" height="30px" />
                                    </div>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a className="nav-link text-white" href="/login" onClick={this.Logout}>Logout</a>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="col-sm-12">
                                    <header className="jumbotron">
                                        <h3>
                                            <strong>{currentUser.email}</strong>
                                        </h3>
                                    </header>
                                    <p>
                                        <strong>Token:</strong>{" "}
                                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                                    </p>
                                    <p>
                                        <strong>Id:</strong>{" "}
                                        {currentUser.id}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        {currentUser.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        this.props.history.push("/")
                    )
                }
            </div>
        );
    }
}