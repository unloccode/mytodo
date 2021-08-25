import React from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {email: '', password: ''};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //definitions
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        //send data to backend
        //bind data
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        //portal
        axios.post("http://localhost:8080/api/auth/signin", user)
        .then(res=>{
            console.log(res.data.accessToken);
            console.log(res.data.email);
            console.log(res.data.id);
            notify.show('Logged In')
        }).catch(error=>{
            console.log(error.response.data);
            notify.show(error.response.data.message);
        })
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Login</h2>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" value={this.state.email} onChange={this.handleEmailChange} className="form-control" placeholder="johndoe@email.com" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="********" required />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}