import React from 'react';
import Homer from './Homer';

//data store
//const DB = [
//    {tskHead: '', tksBody: ''}
//];
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