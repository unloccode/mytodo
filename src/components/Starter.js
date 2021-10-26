import React from 'react';
import Homer from './Homer';

//the date field will acts as a marker
//marker for keeping track of the user task
//and the marker, which essentially is a date, will be used to filter, sort and do basic analysis
const DB = [
    {tskHead: 'code', tksBody: 'one of the finest code', tskDate: '16:44'},
];

export default class Starter extends React.Component{
    render(){
        return(
            <div>
                <Homer tododatas={DB}/>
            </div>
        );
    }
}