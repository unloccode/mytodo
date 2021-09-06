import React from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Spinner from './Spinner';


import x from '../respictures/user.png';
import '../UI/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import  mytodoLogo from '../respictures/mytodologo.png';
import AuthService from '../services/auth.service';


class UpdateProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {imagepreview: '', name: '', username: '', currentUser: AuthService.getCurrentUser()};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFileInfo = this.getFileInfo.bind(this);
    };
    //some inits
    state = {
        sendingEmail: false
    };
    //definitions
    handleUsernameChange(e){
        this.setState({username: e.target.value});
    }
    getFileInfo(e){
        console.log("File info working OK!");
        console.log(e.target.files[0]);
        //this.setState({name: URL.createObjectURL(e.target.files[0])});
        this.setState({imagepreview: URL.createObjectURL(e.target.files[0])});
        this.setState({name: e.target.files[0]});
        //const formData = new FormData();
        ////file info name will be "my-image-file"
        //formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
        //formData.set("thanos", this.state.username);
        //this.setState({imagemetas: formData});
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
        this.setState({sendingEmail: true});
        //code
        if(this.state.name && this.state.username !== ''){
                    
            const formData = new FormData();
            formData.append('my-image-file', this.state.name);
            formData.set('luetext', this.state.username);
            //console.log(formData);

            axios.post("http://localhost:8080/updateprofile", formData)
            .then(res=>{
                this.setState({sendingEmail: false});
                console.log("Axios response: ", res);
                console.log(res.data);
                notify.show(res.data.msg);
                //reroute
                this.props.history.push("/activate_account");
            }).catch((error)=>{
                console.log(error);
            })
        }else{
            console.log("Not Data provided");
        }
    }
    render(){
        const { sendingEmail, currentUser } = this.state;
        return(
            <div>
                {
                    currentUser ? (
                        this.props.history.push("/homer")
                    ) : (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-9 mainbg position-absolute h-100">
                                    <h4 style={{fontSize:'14px', fontWeight:'bolder'}} className="mt-3">MYTODO</h4>
                                    <img src={mytodoLogo} alt="MYTODO" height="100" style={{position:'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%'}} />
                                </div>
                                <div className="col-sm-3 offset-sm-9 position-absolute h-100">
                                    <h3 className="text-center mt-4 pb-4 font16">Update your profile</h3>
                                    <form onSubmit={this.handleSubmit}>
                                    <p className="mt-3">Profile picture</p>
                                        <div className="form-group text-center">
                                            {
                                                this.state.imagepreview
                                                ? <img src={this.state.imagepreview} alt="" className="uiprofile" />
                                                : <img src={x} alt="" className="uiprofile"/>
                                            }
                                        </div>
                                        <div className="form-group text-center">
                                            <label htmlFor="uploadprofile"><FontAwesomeIcon icon={faCamera} size="2x" style={{position:'relative', top: '-70px', left: '70px', color: 'black'}} /></label>
                                            <input type="file" onChange={this.getFileInfo} id="uploadprofile" className="form-control" style={{display: "none"}}  />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" name="username" value={this.state.uname} onChange={this.handleUsernameChange} className="form-control" required style={{borderRadius: '20px'}} />
                                        </div>
                                        <div className="form-group text-center">
                                            <button type="submit" className="btn" disabled={sendingEmail} style={{backgroundColor: 'black', color: 'white', padding: '6px 40px', borderRadius: '20px', fontStyle: 'italic'}} >
                                                {
                                                    sendingEmail
                                                    ? <Spinner size='lg' spinning='fa-spin' />
                                                    : "DIVE IN"
                                                }
                                            </button>
                                        </div>
                                    </form>
                                    <div className="footer">
                                        <p className="termsApply">Terms & Conditions Apply.</p>
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


export default UpdateProfile;