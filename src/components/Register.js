import React from 'react';
import axios from 'axios';

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {email: '', password: ''};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleSubmit(e){
        console.log(this.state.email);
        console.log(this.state.password);
        //prevent default behavior of form submit
        e.preventDefault();
        //code
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(user);
        axios.post('http://localhost:8080/api/auth/signup/', user).then(res=>{
            console.log(res);
            console.log(res.data);
        })
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;