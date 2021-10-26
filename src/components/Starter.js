import React from 'react';
import Homer from './Homer';

const DB = [];

export default class Starter extends React.Component{
    render(){
        return(
            <div>
                <Homer tododatas={DB}/>
            </div>
        );
    }
}