import React from 'react';
import { Link } from 'react-router-dom';

export default class TodoButtonTracker extends React.Component{
    constructor(props){
        super(props);
        this.handleAllTaskButton = this.handleAllTaskButton.bind(this);
    }
    handleAllTaskButton(){
        console.log('terminal');
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div>
                            <button className="mb-2" disabled style={{padding: '4px 25px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '10px', color: 'black', border: 'none'}}>Todos<span style={{paddingLeft: '8px'}}>{this.props.perdayTodoCounter}</span></button>
                            <span style={{paddingRight: '20px'}}></span>
                            <Link to="/alltasks">
                                <button className="btn" style={{padding: '4px 25px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '10px', color: 'black', border: 'nonde'}} onClick={this.handleAllTaskButton} >All tasks</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}