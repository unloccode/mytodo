import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class Lux extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: new Date()};
        this.handleChange = this.handleChange.bind(this);
        this.handeNewValues = this.handeNewValues.bind(this);
    }
    handleChange(){
        console.log('1');
        //this.props.handleLumen(this.state.dateValue);
        console.log(this.state.dateValue)
    }
    handeNewValues(e){
        //console.log(this.state.value);
        this.props.handleLumen(this.state.value);
    }
    render(){
        return(
            <div>
                <button onClick={this.handleChange}>Trigger</button>
                <Calendar onChange={this.handeNewValues} value={this.state.value}/>
            </div>
        );
    }
}