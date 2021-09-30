//import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../App.css';
//import Popup from 'reactjs-popup';
//import Modal from 'react-modal';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

export default class AddTodoButton extends React.Component{
    constructor(){
        super();
        this.state = {showModal: false};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOpenModal(){
        this.setState({showModal: true});
    }
    handleCloseModal(){
        //this.setState({showModal: false})
        console.log('Hello World!');
        alert('Are you sure?');
        //console.log('1');
        this.setState({showModal: false})
    }
    handleSubmit(e){
        e.preventDefault();
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="text-center">
                            <button className="btn" onClick={this.handleOpenModal} style={{backgroundColor: 'white', borderRadius: '20px', border: '2px solid black', padding: '6px 40px'}}><FontAwesomeIcon icon={faPlusCircle} size="1x" /><span style={{marginLeft: '15px', fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '18px'}}>Add Task</span></button>
                        </div>
                        <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example" style={customStyles}>
                            <div className="clearfix">
                                <div className="float-right">
                                    <button className="btn" style={{color: 'white', backgroundColor: 'red', fontFamily: 'sans-serif', fontSize: '12px', borderRadius: '10px', padding: '3px 15px'}} onClick={this.handleCloseModal}>close</button>
                                </div>
                            </div>
                            <div style={{width: '600px'}}>
                                <div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="tasktitle">Task label</label>
                                            <input className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="taskdescription">Description</label>
                                            <textarea className="form-control" id="commnet" name="text" rows="5"></textarea>
                                        </div>
                                        <button className="btn btn-success">Add task</button>
                                    </form>
                                </div>
                            </div>
                        </ReactModal>
                    </div>
                </div>
            </div>
        );
    }
}