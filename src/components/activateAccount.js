import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import Spinner from './Spinner';


class ActivateAccount extends React.Component{
    state = {
        confirming: true
    };
    componentDidMount = () => {
        const {id} = this.props.match.params;
        console.log(id);
        //send key to server
        axios.post(`http://localhost:8080/api/user/${id}`).then(res=>{
            console.log(res);
            console.log(res.data);
            this.setState({confirming: false});
            notify.show(res.data.msg);
        }).catch(error=>console.log(error));
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="display-3">Wait While We Activate Your Account!</div>
                        <Link to="/" className="btn btn-warning">Teleport to Registry TimeStamp</Link>
                        <div className="text-center">
                            <div className="confirm">
                                {
                                    this.state.confirming
                                        ? <Spinner size='8x' spinning={'spinning'} />
                                        : <Link to='/'>
                                            <Spinner size='8x' spinning={''} />
                                        </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActivateAccount;