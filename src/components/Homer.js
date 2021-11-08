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
//connect to the backend
import axios from 'axios';


export default class Homer extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentUser: AuthService.getCurrentUser(), task: this.props.tododatas.length, dataStore: this.props.tododatas, showDate: false, monthData: '', yearData: null, dateData: null, tarehe: new Date(), toggleDayTab: false, frtDate: '', extraDayToggle: false, taskExist: false, perdayTodoCounter: null, rawDates: null};
        this.Logout = this.Logout.bind(this);
        this.receiveDataFromInput = this.receiveDataFromInput.bind(this);
        this.receiveDataFromModify = this.receiveDataFromModify.bind(this);
        this.receiveDataFromUpdate = this.receiveDataFromUpdate.bind(this);
        this.handleDateTrackerChange = this.handleDateTrackerChange.bind(this);
        this.handleDateData = this.handleDateData.bind(this);
        this.handleTareheFromDayTab = this.handleTareheFromDayTab.bind(this);
    }
    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if(user){
            console.log(user);
            this.setState({currentUser: user});
        }
        //receive data from the backend
        const userId = user.id;
        axios.get(`http://localhost:8080/api/auth/task/${userId}`)
        .then(res=>{
            res.data.forEach((count)=>{
                const newData = {taskKey: count.id, tskHead: count.taskHead, tksBody: count.taskBody, tskDate: count.taskDate, timeStamp: count.taskTimeStamp, done: count.done};
                this.setState({dataStore: [...this.state.dataStore, newData]});
                this.setState({task: this.state.task+1});
            })
        }).catch(error=>{
            console.log(error);
        })
        //update dates
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.setState({monthData: months[this.state.tarehe.getMonth()]});
        this.setState({yearData: this.state.tarehe.getFullYear()});
        this.setState({dateData: this.state.tarehe.getDate()});
        //update frtDate
        let newMonth = this.state.tarehe.getMonth()+1;
        let ftimeStamp = "" + this.state.tarehe.getDate()+newMonth+this.state.tarehe.getFullYear();
        this.setState({frtDate: ftimeStamp})
        //extended
        this.setState({rawDates: new Date()});
    }
    Logout(){
        AuthService.logout();
    }
    receiveDataFromInput(receivedInputFromAddTodoButton){
        //some code to receive data
        //titleTask
        //describeTask
        //console.log(receivedInputFromAddTodoButton)
        let y = receivedInputFromAddTodoButton[0].taskDate.getHours();
        let x = receivedInputFromAddTodoButton[0].taskDate.getMinutes();
        let z = y+':'+x;
        //console.log(z);
        //generate date timestamp
        let date = receivedInputFromAddTodoButton[0].taskDate.getDate();
        let month = receivedInputFromAddTodoButton[0].taskDate.getMonth();
        let year = receivedInputFromAddTodoButton[0].taskDate.getFullYear();
        let newMonth = month+1;
        let ftimeStamp = ""+date+newMonth+year;
        const newData = {tskHead: receivedInputFromAddTodoButton[0].taskHead, tksBody: receivedInputFromAddTodoButton[0].taskBody, tskDate: z, timeStamp: ftimeStamp};
        //update state
        this.setState({dataStore: [...this.state.dataStore, newData]});
        this.setState({task: this.state.task+1});
        //push data to database
        //1.taskHead
        //2.taskBody
        //3.taskDate
        //4.taskTimeStamp
        //5.done later
        //6.userId later
        const userTask = {
            taskHead: receivedInputFromAddTodoButton[0].taskHead,
            taskBody: receivedInputFromAddTodoButton[0].taskBody,
            taskDate: z,
            taskTimeStamp: ftimeStamp,
            done: false,
            userbioId: this.state.currentUser.id
        }
        //send data to the backend server
        axios.post("http://localhost:8080/api/auth/writetodo", userTask)
        .then(res=>{
            //some code
            console.log(res.data);
        }).catch(error=>{
            //some code
            console.log(error)
        })
    }
    //update an external databank,
    //push data to the database
    receiveDataFromModify(receivedEditDeleteData){
        let indexing = receivedEditDeleteData - 1;
        let db = this.state.dataStore;
        db.splice(indexing, 1);
        this.setState({dataStore: db});
        this.setState({task: this.state.task-1})
    }
    receiveDataFromUpdate(receivedDatatobeUpdated){
        const taskID = receivedDatatobeUpdated[0].taskId;
        const newData = {taskKey: receivedDatatobeUpdated[0].taskNo, tskHead: receivedDatatobeUpdated[0].taskHead, tksBody: receivedDatatobeUpdated[0].taskBody, tskDate: receivedDatatobeUpdated[0].taskDate, timeStamp: receivedDatatobeUpdated[0].taskTimeStamp};
        //delete init data
        let db = this.state.dataStore;
        db.splice(taskID, 1);
        //add new data to array
        db.splice(taskID, 0, newData);
        //update state
        this.setState({dataStore: db});
        //send updated data to data to backend
        const taskData = {
            id: receivedDatatobeUpdated[0].taskNo,
            taskHead: receivedDatatobeUpdated[0].taskHead,
            taskBody: receivedDatatobeUpdated[0].taskBody,
            taskDate: receivedDatatobeUpdated[0].tskDate,
            taskTimeStamp: receivedDatatobeUpdated[0].taskTimeStamp,
            userId: this.state.currentUser.id
        };
        axios.post("http://localhost:8080/api/auth/taskupdate", taskData)
        .then(res=>{
            console.log(res.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    handleDateTrackerChange(){
        if(this.state.showDate === true){
            this.setState({showDate: false})
        }
        if(this.state.showDate === false){
            this.setState({showDate: true})
        }
    }
    handleDateData(value){
        this.setState({rawDates: value});
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.setState({monthData: months[value.getMonth()]});
        this.setState({yearData: value.getFullYear()});
        this.setState({dateData: value.getDate()});
        //check against current date
        if(this.state.tarehe.getDate() !== value.getDate() && this.state.tarehe.getDate()-1 !== value.getDate() && this.state.tarehe.getDate()+1 !== value.getDate()){
            this.setState({toggleDayTab: true});
        }else{
            this.setState({toggleDayTab: false});
        }
        //test unit
        let newMonth = value.getMonth()+1;
        let ftimeStamp = "" + value.getDate() + newMonth + value.getFullYear();
        //console.log(ftimeStamp);
        //update date
        this.setState({frtDate: ftimeStamp});
        //close date
        this.setState({showDate: false});
        //update number of todos/tasks per day rendered
        let y = 0;
        let x = 0;
        if(this.state.task === 0){
            console.log('Zero');
        }else{
            this.state.dataStore.forEach((task)=>{
                //filter task using data
                if(ftimeStamp === task.timeStamp){
                    y = y+1;
                }else{
                    x=x+1;
                    if(x === this.state.dataStore.length){
                        this.setState({taskExist: true});
                        this.setState({perdayTodoCounter: 0})
                    }
                }
            });
            //second part of the toggle check exist task
            this.setState({perdayTodoCounter: y});
            let t = y;
            for(let a=0; a<y; a++){
                t = t-1;
                if(t === 0){
                    this.setState({taskExist: false});
                }
            }
        }
    }
    handleTareheFromDayTab(month, year, date, extraMonth){
        this.setState({monthData: month});
        this.setState({yearData: year});
        this.setState({dateData: date});
        //update frtDate
        let newMonth = extraMonth+1;
        let ftimeStamp = "" + date+newMonth+year;
        //console.log(ftimeStamp);
        this.setState({frtDate: ftimeStamp})
        //test unit
        //console.log(this.state.dataStore.length)
        let y = 0;
        let x = 0;
        if(this.state.task ===0 ){
            console.log('Zero');
        }else{
            //console.log(ftimeStamp)
            this.state.dataStore.forEach((task)=>{
                //console.log(task.timeStamp);
                if(ftimeStamp === task.timeStamp){
                    y = y+1;
                    //console.log(y)
                }else{
                    x=x+1;
                    if(x === this.state.dataStore.length){
                        this.setState({taskExist: true})
                        this.setState({perdayTodoCounter: 0})
                    }
                }
            });
            //second part of the toggle check exist task
            this.setState({perdayTodoCounter: y})
            let t =y;
            for(let a=0; a<y; a++){
                t = t-1;
                if(t === 0){
                    this.setState({taskExist: false});
                }
            }
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
                                    month = {this.state.monthData}
                                    year = {this.state.yearData}
                                    date = {this.state.dateData}
                                />
                                <Kalenda 
                                    showDate = {this.state.showDate}
                                    handleDateData = {this.handleDateData}
                                />
                                <DayTab
                                    toggleDayTab = {this.state.toggleDayTab}
                                    handleTareheFromDayTab = {this.handleTareheFromDayTab}
                                    month = {this.state.monthData}
                                    year = {this.state.yearData}
                                    date = {this.state.dateData}
                                />
                                <AddTodoButton handleSubmits={this.receiveDataFromInput}
                                    handleDateChange = {this.handleDateTrackerChange}
                                    month = {this.state.monthData}
                                    year = {this.state.yearData}
                                    date = {this.state.dateData}
                                    rawDates = {this.state.rawDates}
                                />
                                <TodoButtonTracker perdayTodoCounter={this.state.perdayTodoCounter} />
                                <TodoRenderer 
                                    task={this.state.task}
                                    tasks = {this.state.dataStore}
                                    fstamp = {this.state.frtDate}
                                    taskExist = {this.state.taskExist}
                                    extraDayToggle = {this.state.extraDayToggle}
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