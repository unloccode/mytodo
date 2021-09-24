import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../App.css';

export default class AddTodoButton extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="text-center">
                            <button className="btn" style={{borderRadius: '30px', fontSize: '21px', border: '2px solid black', backgroundColor: 'transparent', fontFamily:'sans-serif', fontWeight:'500'}}><FontAwesomeIcon icon={faPlusCircle}/><span style={{paddingLeft: '30px'}}>Add Todo</span></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}