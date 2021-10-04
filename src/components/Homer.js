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
import Updater from './Updater';



export default class Homer extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentUser: AuthService.getCurrentUser(), task: this.props.tododatas.length, dataStore: this.props.tododatas};
        this.Logout = this.Logout.bind(this);
        this.receiveDataFromInput = this.receiveDataFromInput.bind(this);
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
        //console.log(receivedInputFromAddTodoButton[0].taskHead);
        //console.log(receivedInputFromAddTodoButton[0].taskBody);
        //add data to array
        //this.setState([...this.state.dataStore, receivedInputFromAddTodoButton]);
        //console.log(this.state.dataStore);
        const newData = {tskHead: receivedInputFromAddTodoButton[0].taskHead, tksBody: receivedInputFromAddTodoButton[0].taskBody};
        //console.log(newData);
        this.setState({dataStore: [...this.state.dataStore, newData]});
        this.setState({task: this.state.task+1});
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
                                <DateTodotracker task={this.state.task}/>
                                <DayTab/>
                                <AddTodoButton handleSubmits={this.receiveDataFromInput}/>
                                <TodoButtonTracker/>
                                <TodoRenderer 
                                    task={this.state.task}
                                    tasks = {this.state.dataStore}
                                />
                                <Updater
                                    task = {this.state.task}
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