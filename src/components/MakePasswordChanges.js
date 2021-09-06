import React from 'react';
import axios from 'axios';
import '../App.css';
import mytodoLogo from '../respictures/mytodologo.png';
import AuthService from '../services/auth.service';

class MakePasswordChanges extends React.Component{
    constructor(props){
        super(props);
        this.state = {password: '', confirmPassword: '', passwordIsSimilar: true, currentUser: AuthService.getCurrentUser()}
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }
    handleConfirmPasswordChange(e){
        this.setState({confirmPassword: e.target.value});
    }
    //auth
    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if(user){
            console.log(user);
            this.setState({currentUser: user});
        }
    }
    handleSubmit(e){
        e.preventDefault();
        //some awesome code
        const {id} = this.props.match.params;
        //check if input passwords matches
        if(this.state.password && this.state.confirmPassword !== ''){
            if(this.state.password !== this.state.confirmPassword){
                this.setState({passwordIsSimilar: false});
            }else{
                this.setState({passwordIsSimilar: true});
                //some awesome code
                axios.post(`http://localhost:8080/api/reset/${id}`, {password: this.state.password})
                .then((res)=>{
                    console.log(res);
                    //console.log('1');
                    //if everything is OK
                    //reroute
                    this.props.history.push("/pwdsuccess");
                })
                .catch(error=>console.log(error));
            }
        }else{
            console.log('empty fields!');
        }
        //console.log(id);
        //axios.post(`http://localhost:8080/api/reset/${id}`, {password: this.state.password})
        //.then(res=>console.log(res)).catch(error=>console.log(error));
    }
    //componentDidMount = () => {
    //    const {id} = this.props.match.params;
    //    //console.log(id);
    //}
    render(){
        const {currentUser} = this.state;
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
                                <div className="col-sm-12 position-absolute h-100">
                                    <div className="card reset-container position-relative w-50 boxshado">
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="password" >New password</label>
                                                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="confirm_password" >Confirm password</label>
                                                    <input type="text" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}  className="form-control"/>
                                                    {
                                                        this.state.passwordIsSimilar
                                                        ? <span></span>
                                                        : <span style={{color: 'red'}} >Password don't match!</span>
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn" style={{color: 'white', backgroundColor: 'black', fontStyle: 'italic', fontSize: '16px', borderRadius: '20px', padding: '6px 40px'}} >UPDATE PASSWORD</button>
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
                    )
                }
            </div>
        );
    }
}

export default MakePasswordChanges;