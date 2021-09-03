import React from 'react';
import AuthService from '../services/auth.service';
import mytodoLogo from '../respictures/mytodologo.png';

export default class Homer extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentUser: AuthService.getCurrentUser()};
    }
    render(){
        const {currentUser} = this.state;
        return(
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-sm-12 navbar" style={{backgroundColor: 'black'}} >
                        <div className="navbar-brand">
                            <img src={mytodoLogo} alt="eye" height="30px" />
                        </div>
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
        );
    }
}