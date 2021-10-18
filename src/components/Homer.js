import React from 'react';
import AuthService from '../services/auth.service';
import mytodoLogo from '../respictures/mytodologo.png';
import profileAvatar from '../respictures/userprofile.png';
import Mepopup from 'reactjs-popup';
import '../UI/profile.css';
import { Link } from 'react-router-dom';
import DateTodotracker from './dateTodotracker';
import DayTab from './DayTab';
import AddTodoButton from './AddTodoButton';
import TodoButtonTracker from './TodoButtonTracker';
import TodoRenderer from './TodoRenderer';
import Kalenda from './Kalenda';



export default class Homer extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentUser: AuthService.getCurrentUser(), task: this.props.tododatas.length, dataStore: this.props.tododatas, showDate: false};
        this.Logout = this.Logout.bind(this);
        this.receiveDataFromInput = this.receiveDataFromInput.bind(this);
        this.receiveDataFromModify = this.receiveDataFromModify.bind(this);
        this.receiveDataFromUpdate = this.receiveDataFromUpdate.bind(this);
        this.handleDateTrackerChange = this.handleDateTrackerChange.bind(this);
    }
    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if(user){
            console.log(user);
            this.setState({currentUser: user});
        }
    }
    Logout(){
        AuthService.logout();
    }
    receiveDataFromInput(receivedInputFromAddTodoButton){
        //some code to receive data
        //titleTask
        //describeTask
        const newData = {tskHead: receivedInputFromAddTodoButton[0].taskHead, tksBody: receivedInputFromAddTodoButton[0].taskBody};
        //update state
        this.setState({dataStore: [...this.state.dataStore, newData]});
        this.setState({task: this.state.task+1});
    }
    receiveDataFromModify(receivedEditDeleteData){
        let indexing = receivedEditDeleteData - 1;
        let db = this.state.dataStore;
        db.splice(indexing, 1);
        this.setState({dataStore: db});
        this.setState({task: this.state.task-1})
    }
    receiveDataFromUpdate(receivedDatatobeUpdated){
        const taskID = receivedDatatobeUpdated[0].taskNo;
        const newData = {tskHead: receivedDatatobeUpdated[0].taskHead, tksBody: receivedDatatobeUpdated[0].taskBody};
        //delete init data
        let indexing = taskID - 1;
        let db = this.state.dataStore;
        db.splice(indexing, 1);
        //add new data to array
        db.splice(indexing, 0, newData);
        //update state
        this.setState({dataStore: db});
    }
    handleDateTrackerChange(){
        if(this.state.showDate === true){
            this.setState({showDate: false})
        }
        if(this.state.showDate === false){
            this.setState({showDate: true})
        }
    }
    render(){
        const {currentUser} = this.state;
        return(
            <div>
                {
                    currentUser ? (
                        <div className="container-fluid">
                            <div className="row">
                                <nav className="col-sm-12 navbar" style={{backgroundColor: 'black'}} >
                                    <div className="navbar-brand">
                                        <img src={mytodoLogo} alt="eye" height="30px" />
                                    </div>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Mepopup trigger={<img src={profileAvatar} alt="User" height="30" style={{cursor: 'pointer'}} />} position="bottom right" arrow={false}>
                                                <div className="card mt-2 text-center" style={{width: '400px'}}>
                                                    <div className="card-body">
                                                        <img src={profileAvatar} alt="profile" className="meprofile" />
                                                        <h4>George Limo</h4>
                                                        <Link to='/login'>
                                                            <button onClick={this.Logout}>Logout</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Mepopup>
                                        </li>
                                    </ul>
                                </nav>
                                <DateTodotracker
                                    task={this.state.task}
                                    handleDateChange = {this.handleDateTrackerChange}
                                />
                                <Kalenda showDate = {this.state.showDate} />
                                <DayTab/>
                                <AddTodoButton handleSubmits={this.receiveDataFromInput}/>
                                <TodoButtonTracker/>
                                <TodoRenderer 
                                    task={this.state.task}
                                    tasks = {this.state.dataStore}
                                    handleEditDelete = {this.receiveDataFromModify}
                                    handleUpdatedTodo = {this.receiveDataFromUpdate}
                                />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12 mt-4">
                                            <div className="text-center mt-4 pt-4" style={{fontFamily: 'sans-serif', fontSize: '12px'}}>Developed by Unloccode<span className="mr-4"></span>Powered by React + Express + Node + MySQL</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        this.props.history.push("/")
                    )
                }
            </div>
        );
    }
}