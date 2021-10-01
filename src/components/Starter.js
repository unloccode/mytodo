import React from 'react';
import Homer from './Homer';

//data store
const DB = [
    {tskHead: 'watering', tksBody: 'water flowers'},
    {tskHead: 'wash', tksBody: 'wash the car'}
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