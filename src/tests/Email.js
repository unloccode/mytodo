import React from 'react';
//import validator from 'validator';
import {validate, res} from 'react-email-validator';

class Email extends React.Component{
    constructor(props){
        super(props);
        this.state = {email: '', emailError: false, emptyField: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({email: e.target.value});
        //print data
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.email !== ''){
            console.log(this.state.email)
            this.setState({emptyField: false})
            //validate email inputted
            validate(this.state.email);
            if(res){
                this.setState({emailError: true});
            }else{
                this.setState({emailError: false});    
            }
        }else{
            console.log("No Data Found!");
            this.setState({emptyField: true});
        }
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Validate Email</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="emal">Email</label>
                                <input type="text" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Enter email" required/>
                                {
                                    this.state.emptyField
                                    ? <span></span>
                                    : this.state.emailError ? <span className="text-success">Email is valid</span> : <span className="text-danger">Invalid email</span>
                                }
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                        <div className="col-sm-4">
                            <span className="text-primary">{this.state.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Email;