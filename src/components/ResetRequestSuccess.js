import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../App.css';
import mytodoLogo from '../respictures/mytodologo.png';
import AuthService from '../services/auth.service';

export default class ResetRequestSuccess extends React.Component{
    state = {
        currentUser: AuthService.getCurrentUser()
    };
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
                                        <img src={mytodoLogo} alt="MYLOGO" height="30px" />
                                    </div>
                                </nav>
                                <div className="section col-sm-12 position-absolute h-100">
                                    <div className="card position-relative w-50 reset-container boxshado">
                                        <div className="card-body">
                                            <p className="text-center">EMAIL RESET LINK SENT, CHECK YOUR INBOX</p>
                                            <div className="text-center mt-4">
                                                <FontAwesomeIcon icon={faCheckCircle} size='8x' style={{color: 'black'}} />
                                            </div>
                                            <div className="text-center mt-4">
                                                <button className="btn" style={{color: 'white', backgroundColor: 'black', padding: '6px 40px', borderRadius: '20px', fontSize: '16px', fontStyle: 'italic', fontWeight: 'bold'}} >OPEN MAILBOX</button>
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