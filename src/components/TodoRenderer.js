import React from 'react';

export default class TodoRenderer extends React.Component{
    constructor(props){
        super(props);
        this.state = {task: 0, taskTracker: true};
    }
    componentDidMount(){
        if(this.state.task !== 1){
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
                                        <div class="card mt-2" style={{border: 'none'}}>
                                            <div class="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>1</div>
                                        </div>
                                        <div class="card mt-2" style={{border: 'none'}}>
                                            <div class="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>2</div>
                                        </div>
                                        <div class="card mt-2" style={{border: 'none'}}>
                                            <div class="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>3</div>
                                        </div>
                                        <div class="card mt-2" style={{border: 'none'}}>
                                            <div class="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>4</div>
                                        </div>
                                        <div class="card mt-2" style={{border: 'none'}}>
                                            <div class="card-body" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>5</div>
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