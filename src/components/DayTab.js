import React from 'react';

export default class DayTab extends React.Component{
    constructor(props){
        super(props);
        this.state = {tarehe: new Date(), yesterdayToggler: false, todayToggler: true, tommorowToggler: false};
        this.handleYesterday = this.handleYesterday.bind(this);
        this.handleToday = this.handleToday.bind(this);
        this.handleTommorow = this.handleTommorow.bind(this);
    }
    handleYesterday(){
        this.setState({yesterdayToggler: true});
        this.setState({todayToggler: false});
        this.setState({tommorowToggler: false});
        //update date
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.props.handleTareheFromDayTab(months[this.state.tarehe.getMonth()], this.state.tarehe.getFullYear(), this.state.tarehe.getDate()-1, this.state.tarehe.getMonth());
    }
    handleToday(){
        this.setState({todayToggler: true});
        this.setState({yesterdayToggler: false});
        this.setState({tommorowToggler: false});
        //update date
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.props.handleTareheFromDayTab(months[this.state.tarehe.getMonth()], this.state.tarehe.getFullYear(), this.state.tarehe.getDate(), this.state.tarehe.getMonth());
    }
    handleTommorow(){
        this.setState({tommorowToggler: true});
        this.setState({yesterdayToggler: false});
        this.setState({todayToggler: false});
        //update date
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.props.handleTareheFromDayTab(months[this.state.tarehe.getMonth()], this.state.tarehe.getFullYear(), this.state.tarehe.getDate()+1, this.state.tarehe.getMonth());
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        {
                            this.props.toggleDayTab
                            ?   <table className="table table-bordered mx-auto w-75 text-center">
                                    <thead>
                                        <tr style={{cursor: 'pointer'}}>
                                            <th className="dt" style={{border: '2px solid black', color: 'white', backgroundColor: 'black', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>TODO FOR DATE</th>
                                            <th className="dt"><span>{this.props.month}</span>_<span>{this.props.year}</span>_<span>{this.props.date}</span></th>
                                        </tr>
                                    </thead>
                                </table>
                            :   <table className="table table-bordered mx-auto w-75 text-center">
                                    <thead>
                                        <tr style={{cursor: 'pointer'}}>
                                            {
                                                this.state.yesterdayToggler
                                                ? <th className="dt" onClick={this.handleYesterday} style={{border: '2px solid black', color: 'white', backgroundColor: 'black', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>YESTERDAY</th>
                                                : <th className="dt" onClick={this.handleYesterday}>YESTERDAY</th>
                                            }
                                            {
                                                this.state.todayToggler
                                                ? <th className="dt" onClick={this.handleToday} style={{border: '2px solid black', color: 'white', backgroundColor: 'black', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>TODAY</th>
                                                : <th className="dt" onClick={this.handleToday}>TODAY</th>
                                            }
                                            {
                                                this.state.tommorowToggler
                                                ? <th className="dt" onClick={this.handleTommorow} style={{border: '2px solid black', color: 'white', backgroundColor: 'black', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>TOMMOROW</th>
                                                : <th className="dt" onClick={this.handleTommorow}>TOMMOROW</th>
                                            }
                                        </tr>
                                    </thead>
                                </table>
                        }
                    </div>
                </div>
            </div>
        );
    }
}