import React from 'react';

class RenderCard extends React.Component{
    render(){
        const todo = this.props.todo;
        return(
            <div className="card mt-2" style={{border: 'none'}}>
                <div className="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                    <div className="row">
                        <div className="col-sm-1 bg-dark">{this.props.id}</div>
                        <div className="col-sm-7 bg-primary">{todo.tskHead}</div>
                        <div className="col-sm-2 bg-warning">
                            <button>Edit</button>
                        </div>
                        <div className="col-sm-2 bg-success">
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class TodoRenderer extends React.Component{
    constructor(props){
        super(props);
        this.state = {taskTracker: false};
        this.handleRetrigger = this.handleRetrigger.bind(this);
    }
    componentDidMount(){
        if(this.props.task !== 0){
            this.setState({taskTracker: true});
        }else{
            this.setState({taskTracker: false});
        }
    }
    handleRetrigger(){
        console.log(this.props.task);
        if(this.props.task !== 0){
            this.setState({taskTracker: true});
        }else{
            this.setState({taskTracker: false});
        }
    }
    render(){
        const rows = [];
        let id = 1;
        this.props.tasks.forEach((todo)=>{
            rows.push(<RenderCard todo={todo} id={id} key={todo.tskHead} />)
            id=id+1;
        });
        return(
            <div className="container-fluid">
                {
                    this.state.taskTracker ? (
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12" style={{height:'350px', overflowX: 'hidden', overflowY: 'scroll'}}>
                                    <div className="todos">
                                        {rows}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="mt-5">
                                        <p style={{fontWeight: 'normal', fontFamily: 'sans-serif', fontSize: '14px',textDecoration: 'underline', textDecorationColor: 'red', textDecorationThickness: '4px'}}>No Tasks Added</p>
                                        <button onClick={this.handleRetrigger}>Trigger</button>
                                        <p>{this.props.task}</p>
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