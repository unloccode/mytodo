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
        this.state = {imagepreview: '', name: '', username: '', currentUser: AuthService.getCurrentUser(), windowWidth: undefined};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFileInfo = this.getFileInfo.bind(this);
    };
    //some inits
    state = {
        sendingEmail: false
    };
    //resize window
    handleResize = () => this.setState({windowWidth: window.innerWidth});
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
        //some awesome code
        this.setState({sendingEmail: true});
        //code
        if(this.state.name && this.state.username !== ''){
                    
            //const formData = new FormData();
            //formData.append('my-image-file', this.state.name);
            //formData.set('luetext', this.state.username);
            //console.log(formData);
            //axios.post("http://localhost:8080/updateprofile", formData)
            ////axios.post("https://keeptaskserver.herokuapp.com/updateprofile", formData)
            //.then(res=>{
            //    this.setState({sendingEmail: false});
            //    console.log("Axios response: ", res);
            //    console.log(res.data);
            //    notify.show(res.data.msg);
            //    //reroute
            //    this.props.history.push("/activate_account");
            //}).catch((error)=>{
            //    console.log(error);
            //})
            //cloudinary formdata
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append("file", this.state.name);
            cloudinaryFormData.append("upload_preset", "opnk2rnc");
            //upload image cloudinary
            axios.post("https://api.cloudinary.com/v1_1/unloccode/image/upload", cloudinaryFormData)
            .then(res=>{
                console.log(res.data.secure_url);
                //send data to backend
                //after image is save to take url
                //const formData = new FormData();
                //formData.append('luedp', res.data.secure_url);
                //formData.set('luetext', this.state.username);
                //send data
                const userData = {
                    luedp: res.data.secure_url,
                    luetext: this.state.username
                };
                //axios.post("http://localhost:8080/updateprofile", userData)
                axios.post("https://keeptaskserver.herokuapp.com/updateprofile", userData)
                .then(ress=>{
                    this.setState({sendingEmail: false});
                    //console.log(ress.data);
                    console.log("Axios response: ", ress);
                    console.log(ress.data);
                    notify.show(ress.data.msg);
                    //reroute
                    this.props.history.push("/activate_account");
                }).catch((error)=>{
                    console.log(error);
                });
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
                                                        <label htmlFor="uploadprofile" style={{cursor: 'pointer'}} ><FontAwesomeIcon icon={faCamera} size="2x" style={{position:'relative', top: '-70px', left: '70px', color: 'black'}} /></label>
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
                                ) : (
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="section col-sm-12 position-absolute h-100">
                                                <div className="text-center mt-4 pt-4 pb-4">
                                                    <h4 style={{fontSize: '18px'}} >Update profile</h4>
                                                </div>
                                                <div className="mx-auto w-75">
                                                    <form onSubmit={this.handleSubmit}>
                                                        <p className="mt-4">Profile picture</p>
                                                        <div className="form-group text-center">
                                                            {
                                                                this.state.imagepreview
                                                                ? <img src={this.state.imagepreview} alt="" className="uiprofile" />
                                                                : <img src={x} alt="" className="uiprofile" />
                                                            }
                                                        </div>
                                                        <div className="form-group text-center">
                                                            <label htmlFor="uploadprofile"><FontAwesomeIcon icon={faCamera} size="2x" style={{position:'relative', top: '-70px', left: '70px', color: 'black'}} /></label>
                                                            <input type="file" onChange={this.getFileInfo} id="uploadprofile" className="form-control" style={{display: "none"}}  />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="username">Username</label>
                                                            <input type="text" value={this.state.uname} onChange={this.handleUsernameChange} className="form-control" style={{borderRadius: '20px'}} required />
                                                        </div>
                                                        <div className="form-group text-center">
                                                            <button className="btn" style={{color: 'white', backgroundColor: 'black', padding: '6px 25px', borderRadius: '20px', fontStyle: 'italic', fontWeight: 'bold', fontSize: '16px'}} >
                                                                {
                                                                    sendingEmail
                                                                    ? <Spinner size='lg' spinning='fa-spin' />
                                                                    : "DIVE IN"
                                                                }
                                                            </button>
                                                        </div>
                                                    </form>
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


export default UpdateProfile;