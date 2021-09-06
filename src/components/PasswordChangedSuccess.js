import React from 'react';
import '../App.css';
import mytodoLogo from '../respictures/mytodologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

export default class PasswordChangedSuccess extends React.Component{
    state = {
        currentUser: AuthService.getCurrentUser()
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
                                <nav className="col-sm-12 navbar mainbg">
                                    <div className="navbar-brand">
                                        <img src={mytodoLogo} alt="MYTODO" height="30px" />
                                    </div>
                                </nav>
                                <div className="section col-sm-12 position-absolute h-100">
                                    <div className="card position-relative w-50 reset-container boxshado">
                                        <div className="card-body">
                                            <p className="text-center">PASSWORD UPDATED SUCCESSFULLY</p>
                                            <div className="text-center mt-4">
                                                <FontAwesomeIcon icon={faCheckCircle} size='8x' style={{color: 'black'}} />
                                            </div>
                                            <div className="text-center mt-4">
                                                <Link to="/login">
                                                    <button className="btn" style={{color: 'white', backgroundColor: 'black', fontSize: '16px', fontWeight: 'bold', fontStyle: 'italic', borderRadius: '20px', padding: '6px 30px'}}>LOGIN</button>
                                                </Link>
                                            </div>
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