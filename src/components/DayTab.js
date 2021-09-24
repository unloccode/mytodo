import React from 'react';

export default class DayTab extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <table class="table table-bordered mx-auto w-75 text-center">
                            <tr>
                                <th class="dt">YESTERDAY</th>
                                <th class="dt">TODAY</th>
                                <th class="dt">TOMMOROW</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}