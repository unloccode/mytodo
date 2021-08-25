import React from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { validate, res } from 'react-email-validator';
import validator from 'validator';

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {email: '', password: '', emailError: false, emptyField: true, emailInUse: false, errorMessage: ''};
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
    async handleSubmit(e){
        //prevent default behavior of form submit
        e.preventDefault();
        //some awesome code
        //code
        //check for empty fields
        if(this.state.email && this.state.password !== ''){
            console.log(this.state.email);
            console.log(this.state.password);
            //set empty field as not empty
            this.setState({emptyField: false});
            this.setState({emailInUse: false});
            //validate email & password
            //validate email
            validate(this.state.email);
            if(res){
                this.setState({emailError: true});
                //validate password
                if(validator.isStrongPassword(this.state.password, {
                    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
                })){
                    this.setState({errorMessage: 'Is Strong Password'})
                    //save data

                    //bind data as json
                    const user = {
                        email: this.state.email,
                        password: this.state.password
                    };
                    ////send data to the server
                    axios.post("http://localhost:8080/api/auth/signup", user)
                    .then(res=>{
                        console.log(res.data.message);
                        notify.show(res.data.message);
                        //load next page
                        this.props.history.push('/updateprofile');
                    }).catch(error=>{
                        if(error.response){
                            //client received an error response (5xx, 4xx)
                            console.log(error.response.data.message);
                            notify.show(error.response.data.message);
                            //set email in use to true
                            this.setState({emailInUse: true});
                        }else if(error.request){
                            //client never received a response, or request never left
                            console.log(error.request);
                        }else{
                            //anything else
                        }
                    });   
                    
                }else{
                    this.setState({errorMessage: 'Weak Password'})
                }     
            }else{
                this.setState({emailError: false});
            }
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
                                <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" required/>
                                {
                                    this.state.emptyField ? <span></span> : this.state.emailError ? <span></span> : <span className="text-danger">Invalid Email! </span>
                                }
                                {
                                    this.state.emailInUse
                                    ? <span style={{fontWeight: 'bold', color: 'red'}} >Email already in use!</span>
                                    : <span></span>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" required/>
                                <span style={{fontWeight: 'bold', color: 'red'}}>{this.state.errorMessage}</span>
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