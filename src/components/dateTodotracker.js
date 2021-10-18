import React from 'react';

class DateTodotracker extends React.Component{
    constructor(props){
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(){
        this.props.handleDateChange();
    }
    render(){
        return(
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="clearfix">
                            <table className="table table-bordered float-left w-25">
                                <thead style={{cursor: 'pointer'}} onClick={this.handleChange}>
                                    <tr>
                                        <th>SEPTEMBER</th>
                                        <th>2021</th>
                                        <th>9</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="float-right" style={{backgroundColor:'black', padding: '9px 25px', color: 'white', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold'}}>{this.props.task} Todos</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DateTodotracker;