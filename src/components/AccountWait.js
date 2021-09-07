import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import mytodoLogo from '../respictures/mytodologo.png';
import AuthService from '../services/auth.service';

export default class AccountWait extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentUser: AuthService.getCurrentUser()};
    }
    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if(user){
            console.log(user);
            this.setState({currentUser: user});
        }
    }
    render(){
        const { currentUser } = this.state;
        return(
            <div>
                {
                    currentUser ? (
                        this.props.history.push("/homer")
                    ) : (
                        <div className="container-fluid">
                            <div className="row">
                                <nav className="navbar col-sm-12" style={{backgroundColor: 'black'}} >
                                    <div className="navbar-brand">
                                        <img src={mytodoLogo} alt="eye" height="30px" />
                                    </div>
                                </nav>
                                <div className="col-sm-12 position-absolute h-100">
                                    <div className="card w-50 boxshado" style={{position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '10px', border: 'none'}}>
                                        <div className="card-header text-center text-white pt-4" style={{backgroundColor: 'black', height: '70px'}} >ACCOUNT ACTIVATION REQUIRED</div>
                                        <div className="card-body text-center mt-5 pt-4">
                                            <p style={{fontSize: '14px'}} >Account confirmation link has been sent to your email, check your inbox. Click the <br/> link to activate your account.</p>
                                            <Link to={{pathname: "https://gmail.com"}} target="_blank">
                                                <button className="btn text-white mt-5 mb-4" style={{backgroundColor: 'black', borderRadius: '20px', padding: '6px 40px', fontStyle: 'italic', fontSize: '16px', fontWeight: 'bold'}} >OPEN MAILBOX</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <p className="termsApplypro">Terms & Conditions Apply.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}