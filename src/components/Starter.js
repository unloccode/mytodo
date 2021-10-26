import React from 'react';
import Homer from './Homer';

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