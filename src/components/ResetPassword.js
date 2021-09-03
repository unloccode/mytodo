import React from 'react';
import mytodoLogo from '../respictures/mytodologo.png';
import '../App.css';
import axios from 'axios';

export default class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {email: ''};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handleSubmit(e){
        //some awesome code
        e.preventDefault();
        console.log(this.state.email)
        //send to data to backend
        axios.post("http://localhost:8080/api/auth/resetpassword", {email: this.state.email})
        .then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-sm-12 navbar" style={{backgroundColor: 'black'}} >
                        <div className="navbar-brand">
                            <img src={mytodoLogo} alt="MYTODO" height="30px" />
                        </div>
                    </nav>
                    <div className="col-sm-12 position-absolute h-100">
                        <div className="card reset-container w-50 position-relative boxshado" style={{borderRadius: '10px', border: 'none'}}>
                            <div className="card-body">
                                <div className="mb-4" style={{fontSize: '16px', fontWeight: 'bold'}}>To generate password reset link, enter the email LINKED to your account.</div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" value={this.state.email} onChange={this.handleEmailChange} className="form-control" style={{borderRadius: '20px'}} required placeholder="johndoe@email.com" />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn" style={{backgroundColor: 'black', color: 'white', fontSize: '16px', fontWeight: 'bold', fontStyle: 'italic', borderRadius: '15px'}} >SEND RESET LINK</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="footer">
                                <p className="termsApplypro">Terms & Conditions Apply.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}