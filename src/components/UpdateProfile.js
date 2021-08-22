import React from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Spinner from './Spinner';


class UpdateProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {imagepreview: '', name: '', username: ''};
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
        const { sendingEmail } = this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Update your Profile</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="uploadprofile">Upload profile picture</label>
                                <input type="file" onChange={this.getFileInfo} className="form-control" />
                            </div>
                            <div className="form-group">
                                <img src={this.state.imagepreview} alt="" width="200" height="200"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" value={this.state.uname} onChange={this.handleUsernameChange} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={sendingEmail}>
                                    {
                                        sendingEmail
                                        ? <Spinner size='lg' spinning='spinning' />
                                        : "JUMP IN"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default UpdateProfile;