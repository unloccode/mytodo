import React from 'react';

export default class Updater extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.task}</p>
            </div>
        );
    }
}