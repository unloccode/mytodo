import React from 'react';

export default class DayTab extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-bordered mx-auto w-75 text-center">
                            <thead>
                                <tr>
                                    <th className="dt">YESTERDAY</th>
                                    <th className="dt">TODAY</th>
                                    <th className="dt">TOMMOROW</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}