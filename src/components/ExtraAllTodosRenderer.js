import React from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RenderCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {showModal: false};
    }
    render(){
        const todo = this.props.todo;
        return(
            <div>
                <div className="card mt-2" style={{border: 'none'}}>
                    <div className="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                        <div className="row">
                            <div className="col-sm-1">
                                <div className="mt-2">
                                    <span className="badge badge-primary">{this.props.id}</span>
                                    <span style={{paddingLeft: '20px', position: 'relative', top: '2px'}}>
                                        <input type="checkbox" />
                                    </span>
                                </div>
                            </div>
                            <div className="col-sm-2" style={{cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} onClick={this.handleOpenModal}>
                                <div className="mt-2">
                                    {todo.tskHead}
                                </div>
                            </div>
                            <div className="col-sm-5" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer', color: 'gray'}} onClick={this.handleOpenModal} >
                                <div className="mt-2">
                                    {todo.tksBody}
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="mt-2 text-center">
                                    {todo.tskDate}
                                </div>
                            </div>
                            <div className="col-sm-1"> 
                                <button className="btn" id={this.props.id} onClick={this.handleOpenModalEdit}><FontAwesomeIcon icon={faEdit} size="1x" style={{color: 'black'}}/></button>
                            </div>
                            <div className="col-sm-1">
                                <button className="btn" id={this.props.id} onClick={this.handleDeleteItem}><FontAwesomeIcon icon={faTrash} size="1x" style={{color: 'black'}} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class ExtraAllTodosRenderer extends React.Component{
    render(){
        const rows = [];
        let id = 1;
        this.props.allTodos.forEach((todo)=>{
            rows.push(<RenderCard todo={todo} id={id} key={todo.tskHead} />)
        })
        return(
            <div>
                {rows}
            </div>
        );
    }
}