import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
//import PreviewTab from './PreviewTab';
import ReactModal from 'react-modal';
//user
import AuthService from '../services/auth.service';
//import backend
import axios from 'axios';

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

class RenderCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {showModal: false, taskH: '', taskB: '', showModalEdit: false, taskID: null, isChecked: false, strikeT: false, currentUser: AuthService.getCurrentUser(), todoId: null, updatedTime: '15:42', updatedDates: '8/11/2021'};
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleOpenModalEdit = this.handleOpenModalEdit.bind(this);
        this.handleCloseModalEdit = this.handleCloseModalEdit.bind(this);
        this.handletaskTitle = this.handletaskTitle.bind(this);
        this.handledescribeTask = this.handledescribeTask.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleTextboxOnchange = this.handleTextboxOnchange.bind(this);
    }
    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if(user){
            this.setState({currentUser: user});
        }
    }
    handleOpenModal(){
        this.setState({showModal: true});
        this.setState({taskH: this.props.todo.tskHead});
        this.setState({taskB: this.props.todo.tksBody});
    }
    handleCloseModal(){
        this.setState({showModal: false});
    }
    handleEditButton(){
        alert('Yeah');
        console.log(this.props.todo);
    }
    handleOpenModalEdit(e){
        this.setState({taskH: this.props.todo.tskHead});
        this.setState({taskB: this.props.todo.tksBody});
        this.setState({showModalEdit: true});
        this.setState({taskID: e.currentTarget.id});
    }
    handleCloseModalEdit(){
        this.setState({showModalEdit: false});
        alert('Are you sure?');
    }
    handletaskTitle(e){
        this.setState({taskH: e.target.value});
    }
    handledescribeTask(e){
        this.setState({taskB: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.taskH && this.state.taskB !== ''){
            if(this.state.taskH === this.props.todo.tskHead && this.state.taskB === this.props.todo.tksBody){
                alert('No changes made!')
            }else{
                //if fields submitted are not empty and tasks data not same as existing, data can be updated
                //time
                const date = new Date();
                //format date
                let newMonth = date.getMonth()+1;
                let ftimeStamp = "" + date.getDate() + newMonth + date.getFullYear();
                //format time
                let h = date.getHours();
                let m = date.getMinutes();
                let fdate = h + ':' + m;
                const combinedData = [
                    {taskNo: this.props.todo.taskKey, taskHead: this.state.taskH, taskBody: this.state.taskB, taskId: this.state.taskID, taskDone: this.props.todo.done, taskDate: fdate, taskTimeStamp: ftimeStamp}
                ];
                //send combine data to origin
                this.props.handleUpdatedTodoRoute(combinedData);
            }
        }
    }
    handleDeleteItem(e){
        this.props.handleEditDeleteRoute(e.currentTarget.id);
        //send data to backend
        //const user = {
        //    userId : this.state.currentUser.id,
        //    idTask : this.props.todo.tskHead
        //};
        //init axios
        //axios.delete("http://localhost:8080/api/auth/", {user})
        const userId = this.state.currentUser.id;
        const id = this.props.todo.tskHead;
        axios.delete(`http://localhost:8080/api/auth/taskrd/${id}`, {data: {foo: userId}})
        .then(res=>{
            console.log(res.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    handleTextboxOnchange(e){
        //toggle isChecked to true
        this.setState({isChecked: true});
        if(this.state.strikeT === false){
            this.setState({strikeT: true})
        }
        //probe time for current dates
        const date = new Date();
        //format date
        let newMonth = date.getMonth()+1;
        let ftimeStamp = ""+date.getDate() + "/" + newMonth + "/" + date.getFullYear();
        //format time
        let h = date.getHours();
        let m = date.getMinutes();
        let fdate = h + ":" + m;
        //update state
        this.setState({updatedTime: fdate});
        this.setState({updatedDates: ftimeStamp});

        //send data to the backend
        //send user id & task id
        const user = {
            userId : this.state.currentUser.id,
            idTask : this.props.todo.tskHead,
            taskDate: fdate,
            taskTimeStamp: ftimeStamp
        };
        axios.post("http://localhost:8080/api/auth/taskdone", user)
        .then(res=>{
            console.log(res.data);
        }).catch(error=>{
            console.log(error);
        })
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
                                    <span style={{paddingLeft: '10px', position: 'relative', top: '2px'}}>
                                        
                                        {
                                            todo.done
                                            ? <input type="checkbox" checked={todo.done} id={this.props.id} onChange={this.handleTextboxOnchange} />
                                            : <input type="checkbox" checked={this.state.isChecked} id={this.props.id} onChange={this.handleTextboxOnchange} />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="col-sm-2" style={{cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} onClick={this.handleOpenModal}>
                                {
                                    this.state.strikeT ?
                                    (
                                        <div className="mt-2" style={{textDecoration: 'line-through'}}>
                                            {todo.tskHead}
                                        </div>
                                    ) : (
                                        <div>
                                            {
                                                todo.done ? (
                                                    <div className="mt-2" style={{textDecoration: 'line-through'}}>{todo.tskHead}</div>
                                                ) : (
                                                    <div className="mt-2">{todo.tskHead}</div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="col-sm-4" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer', color: 'gray'}} onClick={this.handleOpenModal} >
                                {
                                    this.state.strikeT ?
                                    (
                                        <div className="mt-2" style={{textDecoration: 'line-through'}}>
                                            {todo.tksBody}
                                        </div>
                                    ) : (
                                        <div>
                                            {
                                                todo.done ? (
                                                    <div className="mt-2" style={{textDecoration: 'line-through'}}>{todo.tksBody}</div>
                                                ) : (
                                                    <div className="mt-2">{todo.tksBody}</div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="col-sm-3">
                                <div className="mt-2 text-center">
                                    {
                                        this.state.strikeT ? (
                                            <div>
                                                <span>{this.state.updatedTime}</span>
                                                <span> </span>
                                                <span style={{borderLeft: '2px solid red', height: '14px', paddingLeft: '5px'}}>{this.state.updatedDates}</span>
                                            </div>
                                        ) : (
                                            <div>
                                                {
                                                    todo.done ? (
                                                        <div>
                                                            <span>{todo.tskDate}</span>
                                                            <span> </span>
                                                            <span style={{borderLeft: '2px solid red', height: '14px', paddingLeft: '5px'}}>{todo.timeStamp}</span>
                                                        </div>
                                                    ) : (
                                                        <span>{todo.tskDate}</span>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-sm-1"> 
                                {
                                    this.state.strikeT ?
                                    (
                                        <span></span>
                                    ) : (
                                        <div>
                                            {
                                                todo.done ? (
                                                    <span></span>
                                                ) : (
                                                    <button className="btn" id={this.props.id} onClick={this.handleOpenModalEdit}><FontAwesomeIcon icon={faEdit} size="1x" style={{color: 'black'}}/></button>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="col-sm-1">
                                <button className="btn" id={this.props.id} onClick={this.handleDeleteItem}><FontAwesomeIcon icon={faTrash} size="1x" style={{color: 'black'}} /></button>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Terminal" style={customStyles} appElement={document.getElementById('root')}>
                                    <div className="clearfix">
                                        <div className="float-right">
                                            <button className="btn" style={{color: 'white', backgroundColor: 'red', fontFamily: 'sans-serif', fontSize: '12px', borderRadius: '10px', padding: '3px 15px'}} onClick={this.handleCloseModal}>close</button>
                                        </div>
                                    </div>
                                    <div style={{width: '600px'}}>
                                        <div className="display-5 text-center">TASK PANEL</div>
                                        <div className="mt-3">
                                            <p style={{fontWeight: 600}}>{this.state.taskH}</p>
                                            <hr/>
                                            <p style={{fontFamily: 'monospace'}}>{this.state.taskB}</p>
                                        </div>
                                    </div>
                                </ReactModal>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <ReactModal isOpen={this.state.showModalEdit} contentLabel="Minimal Modal Terminal" style={customStyles} appElement={document.getElementById('root')}>
                                    <div className="clearfix">
                                        <div className="float-right">
                                            <button className="btn" style={{color: 'white', backgroundColor: 'red', fontFamily: 'sans-serif', fontSize: '12px', borderRadius: '10px', padding: '3px 15px'}} onClick={this.handleCloseModalEdit}>close</button>
                                        </div>
                                    </div>
                                    <div style={{width: '600px'}}>
                                        <div>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="tasktitle">Task label</label>
                                                    <input className="form-control" type="text" value={this.state.taskH} onChange={this.handletaskTitle} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="taskdescription">Description</label>
                                                    <textarea className="form-control" id="commnet" name="text" rows="5" type="text" value={this.state.taskB} onChange={this.handledescribeTask}></textarea>
                                                </div>
                                                <button className="btn btn-success">Add task</button>
                                            </form>
                                        </div>
                                    </div>   
                                </ReactModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class TodoRenderer extends React.Component{
    state = {
        switchDateTask: false,
    }
    render(){
        const rows = [];
        let id = 1;
        this.props.tasks.forEach((todo)=>{
            if(todo.timeStamp === this.props.fstamp){
                rows.push(<RenderCard todo={todo} id={id} key={todo.taskKey} handleEditDeleteRoute={this.props.handleEditDelete} handleUpdatedTodoRoute={this.props.handleUpdatedTodo}/>)
                id=id+1;
            }
        });
        //array mods
        //console.log('ARRAY');
        //let months = [
        //    {name: 'george', age: 25},
        //    {name: 'colins', age: 16},
        //    {name: 'brian', age: 23},
        //];
        //let days = months.splice(0, 0, {name: 'cate', age: 24});
        //console.log(days);
        //console.log(months)
        return(
            <div className="container-fluid">
                {
                    this.props.task ? (
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12" style={{height:'350px', overflowX: 'hidden', overflowY: 'scroll'}}>
                                    {
                                        this.props.taskExist
                                        ? (
                                            <div className="mt-5">
                                                <div className="mt-5 pt-5"></div>
                                                <p style={{fontWeight: 'normal', fontFamily: 'sans-serif', fontSize: '14px',textDecoration: 'underline', textDecorationColor: 'red', textDecorationThickness: '4px'}}>No Tasks Added</p>
                                                <div className="mt-5 pt-5"></div>
                                                <div className="mt-5 pt-5"></div>
                                                <div className="mt-5"></div>
                                            </div>
                                        ) : (
                                            <div className="todos">
                                                {rows}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="mt-5">
                                        <div className="mt-5 pt-5"></div>
                                        <p style={{fontWeight: 'normal', fontFamily: 'sans-serif', fontSize: '14px',textDecoration: 'underline', textDecorationColor: 'red', textDecorationThickness: '4px'}}>No Tasks Added</p>
                                        <div className="mt-5 pt-5"></div>
                                        <div className="mt-5 pt-5"></div>
                                        <div className="mt-5"></div>
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