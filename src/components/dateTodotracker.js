import React from 'react';

class DateTodotracker extends React.Component{
    render(){
        return(
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="clearfix">
                            <table className="table table-bordered float-left w-25">
                                <thead>
                                    <tr>
                                        <th>SEPTEMBER</th>
                                        <th>2021</th>
                                        <th>09</th>
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