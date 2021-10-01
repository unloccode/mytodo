import React from 'react';

export default class TodoRenderer extends React.Component{
    constructor(props){
        super(props);
        this.state = {task: this.props.taskno, taskTracker: true};
    }
    componentDidMount(){
        console.log(this.state.task)
        if(this.state.task !== 2){
            this.setState({taskTracker: false});
        }else{
            this.setState({taskTracker: true});
        }
    }
    render(){
        return(
            <div className="container-fluid">
                {
                    this.state.taskTracker ? (
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12" style={{height:'350px', overflowX: 'hidden', overflowY: 'scroll'}}>
                                    <div className="todos">
                                        <div className="card mt-2" style={{border: 'none'}}>
                                            <div className="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                                                <span>1</span>{this.props.tasks[0].tskHead}<span>{this.props.tasks[0].tksBody}</span>
                                            </div>
                                        </div>
                                        <div className="card mt-2" style={{border: 'none'}}>
                                            <div className="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>2</div>
                                        </div>
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