import React from 'react';
import Homer from './Homer';

//the date field will acts as a marker
//marker for keeping track of the user task
//and the marker, which essentially is a date, will be used to filter, sort and do basic analysis
//const DB = [
//    {tskHead: 'code', tksBody: 'one of the finest code', tskDate: '16:44', timeStamp: '28102021'},
//    {tskHead: 'glass animals', tksBody: 'Heat waves', tskDate: '15:21', timeStamp: '29102021'},
//    {tskHead: 'slim shady', tksBody: 'Not afraid', tskDate: '12:07', timeStamp: '27102021'},
//];
const DB = [];
//now the task bundle contains a marker, and that marker is a unique id
//the marker is assigned a timestamp, this is the unique identifier

export default class Starter extends React.Component{
    render(){
        return(
            <div>
                <Homer tododatas={DB}/>
            </div>
        );
    }
}