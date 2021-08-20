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
        //prevent default behavior of form submit
        e.preventDefault();
        //code
        //check for empty fields
        if(this.state.email && this.state.password !== ''){
            console.log(this.state.email);
            console.log(this.state.password);
            //bind as json
            const user = {
                email: this.state.email,
                password: this.state.password
            }
            axios.post('http://localhost:8080/api/auth/signup/', user).then(res=>{
                console.log(res);
                console.log(res.data);
                //if everything is okay load updateprofile page
            })
            this.props.history.push('/updateprofile');
        }else{
            console.log("No Data provide!");
        }
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