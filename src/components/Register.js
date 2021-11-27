import React from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { validate, res } from 'react-email-validator';
import validator from 'validator';
import '../App.css';
import mytodoLogo from '../respictures/mytodologo.png';
import mobileMytodologo from '../respictures/mobil.png';
import showPass from '../respictures/show-password.svg';
import hidePass from '../respictures/hide-password.svg';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {email: '', password: '', confirmPassword: '', emailError: false, emptyField: true, emailInUse: false, errorMessage: '', passwordMatch: '', isRevealPass: false, currentUser: AuthService.getCurrentUser(), windowWidth: undefined};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.togglePasswordHide = this.togglePasswordHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleResize = () => this.setState({windowWidth: window.innerWidth});
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleConfirmPasswordChange(e){
        //some awesome code
        this.setState({confirmPassword: e.target.value});
    }
    togglePasswordHide(){
        if(this.state.isRevealPass ===! true){
            this.setState({isRevealPass: true});
        }else{
            this.setState({isRevealPass: false});
        }
    }
    //authentication
    componentDidMount(){
        //screen resize
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        //auth
        const user = AuthService.getCurrentUser();
        if(user){
            console.log(user);
            this.setState({currentUser: user});
        }
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize);
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
            console.log(this.state.confirmPassword);
            //set empty field as not empty
            this.setState({emptyField: false});
            this.setState({emailInUse: false});
            //validate email & password
            //validate email
            validate(this.state.email);
            if(res){
                this.setState({emailError: true});
                //validate password
                //check if password matches
                if(this.state.password === this.state.confirmPassword){
                    this.setState({passwordMatch: ''});
                    //check if password meets the requirements
                    //minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
                    if(validator.isStrongPassword(this.state.password, {minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0})){
                        this.setState({errorMessage: ''});
                        //send data to backed
                        //bind data as json
                        const user = {
                            email: this.state.email,
                            password: this.state.password
                        }
                        //send data to the backend server hosted on heroku
                        //axios.post("http://localhost:8080/api/auth/signup", user)
                        axios.post("https://keeptaskserver.herokuapp.com/api/auth/signup", user)
                        .then(res=>{
                            console.log(res.data.message);
                            notify.show(res.data.message);
                            //load next page
                            this.props.history.push("/updateprofile");
                        }).catch(error=>{
                            if(error.response){
                                //client received an errir response (5xx, 4xx)
                                console.log(error.response.data.message);
                                notify.show(error.response.data.message);
                                //set email in use to true
                                this.setState({emailInUse: true});
                            }else if(error.request){
                                //client never received a response or request never left
                                console.log(error.request);
                            }else{
                                //anything else
                            }
                        })
                    }else{
                    this.setState({errorMessage: 'Weak Password'})
                    }
                }else{
                    this.setState({passwordMatch: 'Password do not match!'});
                }     
            }else{
                this.setState({emailError: false});
            }
        }else{
            console.log("No Data provided!");
        }
    }
    render(){
        const { currentUser} = this.state;
        return(
            <div>
                {
                    currentUser ? (
                        this.props.history.push("/homer")
                    ) : (
                        <div>
                            {
                                this.state.windowWidth >= 885 ? (
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-9 mainbg position-absolute h-100">
                                                <h4 style={{fontSize:'14px', fontWeight:'bolder'}} className="mt-3">MYTODO</h4>
                                                <img src={mytodoLogo} alt="MYTODO" height="100" style={{position:'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%'}} />
                                            </div>
                                            <div className="col-sm-3 offset-sm-9 position-absolute h-100">
                                                <div className="clearfix">
                                                    <Link to="/login">
                                                        <button className="float-right mt-2 btn" style={{color:'white', backgroundColor: 'black', borderRadius: '20px', padding: '6px 25px', fontSize: '14px', fontWeight: '700'}}>Login instead?</button>
                                                    </Link>
                                                </div>
                                                <h3 className="text-center mt-4 pb-4 font16">Create account</h3>
                                                <div className="pt-4 mt-4"></div>
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="nikolatesla@email.com" className="form-control" style={{borderRadius: '20px'}} required />
                                                        {
                                                            this.state.emptyField ? <span></span> : this.state.emailError ? <span></span> : <span className="text-danger">Invalid Email!</span>
                                                        }
                                                        {
                                                            this.state.emailInUse
                                                            ? <span style={{fontWeight: 'bold', color: 'red'}} >Email already in use!</span>
                                                            : <span></span>
                                                        }
                                                    </div>
                                                    <div className="form-group pwd-container">
                                                        <label htmlFor="password">Password</label>
                                                        <input name="pwd" type={this.state.isRevealPass ? "text" : "password"} value={this.state.password} onChange={this.handlePasswordChange} className="form-control" style={{borderRadius: '20px'}} required />
                                                        <img title={this.state.isRevealPass ? "Hide password" : "Show password"}
                                                             src={this.state.isRevealPass ? hidePass : showPass}
                                                             onClick={this.togglePasswordHide}
                                                             alt="eye"
                                                        />
                                                        <span style={{fontWeight: 'bold', color:'red'}} >{this.state.errorMessage}</span>
                                                    </div>
                                                    <div className="form-group pwd-container">
                                                        <label htmlFor="confirmpassword">Confirm password</label>
                                                        <input type={this.state.isRevealPass ? "text" : "password"} value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} className="form-control" style={{borderRadius: '20px'}} />
                                                        <img
                                                            title={this.state.isRevealPass ? "Hide password" : "Show password"}
                                                            src={this.state.isRevealPass ? hidePass : showPass}
                                                            onClick={this.togglePasswordHide}
                                                            alt="eye"
                                                        />
                                                        <span style={{fontWeight: 'bold', color: 'yellow'}} >{this.state.passwordMatch}</span>
                                                    </div>
                                                    <div className="form-group text-center">
                                                        <button className="btn" style={{backgroundColor: 'black', color: 'white', borderRadius: '20px', fontSize:'16px', padding: '6px 25px', fontStyle: 'italic'}} >SIGN UP</button>
                                                    </div>
                                                </form>
                                                <div className="footer">
                                                    <p className="termsApply">Terms & Conditions Apply.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                ) : (
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="section col-sm-12 position-absolute h-100">
                                                <div className="text-center">
                                                    <img src={mobileMytodologo} alt="MYTODO" height="150"/>
                                                    <h4 style={{fontSize: '18px'}} >Create account</h4>
                                                </div>
                                                <div className="mx-auto w-75">
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="email" >Email</label>
                                                            <input type="text" value={this.state.email} onChange={this.handleEmailChange} className="form-control" style={{borderRadius: '20px'}} placeholder="johndoe@email.com" required />
                                                            {
                                                                this.state.emptyField ? <span></span> : this.state.emailError ? <span></span> : <span className="text-danger">Invalid Email!</span>
                                                            }
                                                            {
                                                                this.state.emailInUse
                                                                ? <span style={{fontWeight: 'bold', color: 'red'}} >Email already in use!</span>
                                                                : <span></span>
                                                            }
                                                        </div>
                                                        <div className="form-group pwd-container">
                                                            <label htmlFor="password" >Password</label>
                                                            <input type={this.state.isRevealPass ? "text" : "password"} value={this.state.password} onChange={this.handlePasswordChange} className="form-control" style={{borderRadius: '20px'}} required />
                                                            <img
                                                                title={this.state.isRevealPass ? "Hide password" : "Show password"}
                                                                src={this.state.isRevealPass ? hidePass : showPass}
                                                                onClick={this.togglePasswordHide}
                                                                alt="eye"
                                                            />
                                                        </div>
                                                        <div className="form-group pwd-container">
                                                            <label htmlFor="confirmPassword" >Confirm password</label>
                                                            <input type={this.state.isRevealPass ? "text" : "password"} value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} className="form-control" style={{borderRadius: '20px'}} required />
                                                            <img
                                                                title={this.state.isRevealPass ? "Hide password" : "Show password"}
                                                                src={this.state.isRevealPass ? hidePass : showPass}
                                                                onClick={this.togglePasswordHide}
                                                                alt="eye"
                                                            />
                                                            <span style={{fontWeight: 'bold', color: 'red'}} >{this.state.passwordMatch}</span>
                                                        </div>
                                                        <div className="form-group text-center">
                                                            <button className="btn" style={{fontSize: '16px', color: 'white', backgroundColor: 'black', fontStyle: 'italic', padding: '6px 25px', borderRadius: '20px'}}>SIGN UP</button>
                                                        </div>
                                                    </form>
                                                    <p style={{fontStyle: 'italic', fontSize: '12px'}}  className="text-center">Already have an account? <Link to="/login"><span className="text-primary">Sign In</span></Link></p>
                                                </div>
                                                <div className="footer">
                                                    <p className="mobileTC">Terms & Conditions Apply.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>      
                    )
                }
            </div>
        );
    }
}

export default Register;