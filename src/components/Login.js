import React from 'react';
//import axios from 'axios';
import AuthService from '../services/auth.service';
import { notify } from 'react-notify-toast';
import '../App.css';
import mytodoLogo from '../respictures/mytodologo.png';
import mobileMytodoLogo from '../respictures/mobil.png';
import showPass from '../respictures/hide-password.svg';
import hidePass from '../respictures/show-password.svg';
import { Link } from 'react-router-dom';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {email: '', password: '', isRevealPass: false, currentUser: AuthService.getCurrentUser(), errorMessage: '', windowWidth: undefined};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.togglePasswordHide = this.togglePasswordHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //windoResize
    handleResize =() => {this.setState({windowWidth: window.innerWidth})}
    //definitions
    handleEmailChange(e){
        this.setState({email: e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    togglePasswordHide(){
        if(this.state.isRevealPass ===! true){
            this.setState({isRevealPass: true});
        }else{
            this.setState({isRevealPass: false});
        }
    }
    componentDidMount(){
        //window resize
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
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        //send data to backend
        //bind data
        //const user = {
        //    email: this.state.email,
        //    password: this.state.password
        //};
        //portal
        //axios.post("http://localhost:8080/api/auth/signin", user)
        //.then(res=>{
        //    console.log(res.data.accessToken);
        //    console.log(res.data.email);
        //    console.log(res.data.id);
        //    notify.show('Logged In')
        //}).catch(error=>{
        //    console.log(error.response.data);
        //    notify.show(error.response.data.message);
        //})
        AuthService.login(this.state.email, this.state.password).then(()=>{
            //coded
            notify.show('Logged In');
            this.props.history.push("/homer");
            window.location.reload();
        },
        error=>{
            const resMessage = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            console.log(resMessage);
            notify.show(resMessage);
            this.setState({errorMessage: resMessage});
        }
        );
    }
    render(){
        const { currentUser } = this.state;
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
                                            <div className="col-sm-9 position-absolute h-100 mainbg">
                                                <h4 style={{fontSize:'14px', fontWeight:'bolder'}} className="mt-3">MYTODO</h4>
                                                <img src={mytodoLogo} alt="MYTODO" height="100" style={{position:'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%'}} />
                                            </div>
                                            <div className="col-sm-3 offset-sm-9 position-absolute h-100">
                                                <div className="clearfix">
                                                    <Link to="/">
                                                        <button  className="btn float-right mt-2" style={{color:'white', backgroundColor: 'black', borderRadius: '20px', padding: '6px 25px', fontSize: '14px', fontWeight: '700'}}>Signup instead?</button>
                                                    </Link>
                                                </div>
                                                <h3 className="text-center mt-4 pb-4 font16">Login</h3>
                                                <div className="pt-4 mt-4"></div>
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="text" value={this.state.email} onChange={this.handleEmailChange} className="form-control" placeholder="johndoe@email.com" required style={{borderRadius: '20px'}} />
                                                    </div>
                                                    <div className="form-group pwd-container">
                                                        <label htmlFor="password">Password</label>
                                                        <input type={this.state.isRevealPass ? "text" : "password"} value={this.state.password} onChange={this.handlePasswordChange} className="form-control" required style={{borderRadius: '20px'}} />
                                                        <img
                                                            title={this.state.isRevealPass ? "Hide password" : "Show password"}
                                                            src={this.state.isRevealPass ? showPass : hidePass}
                                                            onClick={this.togglePasswordHide}
                                                            alt="eye"
                                                        />
                                                        {
                                                            this.state.errorMessage
                                                            ? <span style={{color: 'red'}} >{this.state.errorMessage}</span>
                                                            : <span></span>
                                                        }
                                                    </div>
                                                    <div className="form-group text-center">
                                                        <button className="btn" style={{backgroundColor: 'black', color: 'white', borderRadius: '20px', fontSize:'14px', padding: '6px 40px', fontStyle: 'italic'}}>Login</button>
                                                        <p className="mt-3">
                                                            <Link to="/resetpassword"><button style={{fontSize: '12px', fontStyle: 'italic', backgroundColor: 'transparent', border: 'none'}}  className="btn">Forgot password?</button></Link>
                                                        </p>
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
                                                    <img src={mobileMytodoLogo} alt="MYTODO" height="150px" />
                                                    <h4 style={{fontSize: '18px'}} >Login</h4>
                                                </div>
                                                <div className="mx-auto w-75">
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="email" >Email</label>
                                                            <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} style={{borderRadius: '20px'}} placeholder="johndoe@email.com" required />
                                                        </div>
                                                        <div className="form-group pwd-container">
                                                            <label htmlFor="password">Password</label>
                                                            <input type={this.state.isRevealPass ? "text" : "password"} className="form-control" value={this.state.password} onChange={this.handlePasswordChange} style={{borderRadius: '20px'}} required />
                                                            <img
                                                                title={this.state.isRevealPass ? "Hide password" : "Show password"}
                                                                src={this.state.isRevealPass ? showPass : hidePass}
                                                                onClick={this.togglePasswordHide}
                                                                alt="eye"
                                                            />
                                                            {
                                                                this.state.errorMessage
                                                                ? <span style={{color: 'red'}} >{this.state.errorMessage}</span>
                                                                : <span></span>
                                                            }
                                                        </div>
                                                        <div className="form-group text-center">
                                                            <button className="btn" style={{color: 'white', backgroundColor: 'black', fontSize: '16', fontStyle: 'italic', padding: '6px 25px', borderRadius: '20px'}} >SIGN IN</button>
                                                        </div>
                                                    </form>
                                                    <p style={{fontStyle: 'italic', fontSize: '12px'}}  className="text-center">Already have an account? <Link to="/"><span className="text-primary">Sign Up</span></Link></p>
                                                    <p className="mt-3 text-center">
                                                            <Link to="/resetpassword"><button style={{fontSize: '12px', fontStyle: 'italic', backgroundColor: 'transparent', border: 'none'}}  className="btn">Forgot password?</button></Link>
                                                    </p>
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