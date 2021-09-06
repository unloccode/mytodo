import React from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Spinner from './Spinner';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import mytodoLogo from '../respictures/mytodologo.png';
import AuthService from '../services/auth.service';


class ActivateAccount extends React.Component{
    state = {
        confirming: true,
        currentUser: AuthService.getCurrentUser()
    };
    componentDidMount = () => {
        const user = AuthService.getCurrentUser();
        if(user){
            console.log(user);
            this.setState({currentUser: user});
        }
        const {id} = this.props.match.params;
        console.log(id);
        //send key to server
        axios.post(`http://localhost:8080/api/user/${id}`).then(res=>{
            console.log(res);
            console.log(res.data);
            this.setState({confirming: false});
            notify.show(res.data.msg);
        }).catch(error=>console.log(error));
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
                                <nav className="navbar mainbg col-sm-12">
                                    <div className="navbar-brand text-white">
                                        <img src={mytodoLogo} alt="eye" height="30px" />
                                    </div>
                                </nav>
                                <div className="col-sm-12 position-absolute h-100">
                                    <div className="card w-50" style={{position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '10px', border: 'none'}} >
                                        <div className="card-body boxshado" style={{borderRadius: '10px'}} >
                                            {
                                                this.state.confirming
                                                ? <div className="text-center" style={{fontSize: '16px', fontWeight: 'bold'}} >ACTIVATING YOUR ACCOUNT</div>
                                                : <div className="text-center" style={{fontSize: '16px', fontWeight: 'bold'}} >ACCOUNT ACTIVATED</div>
                                            }
                                            <div className="confirm text-center mt-5 pt-5">
                                                {
                                                    this.state.confirming
                                                    ? <Spinner size='8x' spinning='fa-spin' />
                                                    : <FontAwesomeIcon icon={faCheckCircle} size='8x' />
                                                }
                                            </div>
                                            <div className="mt-4 pt-4"></div>
                                            <div className="text-center">
                                                <Link to="/login"><button className="btn" style={{backgroundColor: 'black', color: 'white', padding: '6px 20px', fontSize: '12px', borderRadius: '15px'}} >Login</button></Link>
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

export default ActivateAccount;