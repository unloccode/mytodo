import React from 'react';
import mytodoLogo from '../respictures/mytodologo.png';
import profileAvatar from '../respictures/userprofile.png';
import AuthService from '../services/auth.service';
import Mepopup from 'reactjs-popup';
import '../UI/profile.css';
import { Link } from 'react-router-dom';
//connect to the backend
import axios from 'axios';
import ExtraAllTodosRenderer from './ExtraAllTodosRenderer';


export default class AllTasks extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentUser: AuthService.getCurrentUser(), allTodos: [], todosCount: null, task: null};
        this.Logout = this.Logout.bind(this);
    }
    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if(user){
            this.setState({currentUser: user});
        }
        //load data from the backend
        const userId = user.id;
        axios.get(`http://localhost:8080/api/auth/task/${userId}`)
        .then(res=>{
            res.data.forEach((count)=>{
                const newData = {tskHead: count.taskHead, tksBody: count.taskBody, tskDate: count.taskDate, timeStamp: count.taskTimeStamp};
                this.setState({allTodos: [...this.state.allTodos, newData]});
                this.setState({task: this.state.task+1});
            })
        }).catch(error=>{
            console.log(error);
        })
    }
    Logout(){
        AuthService.logout();
    }
    render(){
        const {currentUser} = this.state;
        return(
            <div>
                {
                    currentUser ? (
                        <div className="container-fluid">
                            <div className="row">
                                <nav className="col-sm-12 navbar" style={{backgroundColor: 'black'}}>
                                    <div className="navbar-brand">
                                        <img src={mytodoLogo} alt="eye" height="30px" />
                                    </div>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Mepopup trigger={<img src={profileAvatar} alt="User" height="30px" style={{cursor: 'pointer'}} />} position="bottom right" arrow="false">
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
                                <div className="col-sm-12">
                                    <div className="mb-2"></div>
                                    <div className="clearfix float-left">
                                        <Link to="/homer">
                                            <button className="btn" style={{padding: '4px 25px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '10px', color: 'white', border: 'none', backgroundColor: 'black'}}>Home</button>
                                        </Link>
                                    </div>
                                    <div className="clearfix float-right">
                                        <button className="btn" disabled style={{padding: '4px 25px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '10px', color: 'black', border: 'none'}}>All tasks<span style={{paddingLeft: '20px'}}>{this.state.task}</span></button>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <ExtraAllTodosRenderer
                                        allTodos = {this.state.allTodos}
                                    />
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