import React from 'react';
import { Link } from 'react-router-dom';


class ActivateAccount extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="display-3">Activate Your Account!</div>
                        <Link to="/" className="btn btn-warning">Teleport to Registry TimeStamp</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActivateAccount;