import React from 'react';
import TodoRenderer from './TodoRenderer';

export default class PreTodoRenderer extends React.Component{
    render(){
        const rows = [];
        this.props.tasks.forEach((product)=>{
            rows.push(<TodoRenderer taskdata={product} key={product.tskHead} />)
        });
        return(
            <div className="container-fluid">
                <TodoRenderer
                    taskdatano = {this.props.taskno}
                    taskdata = {this.props.tasks}
                />
            </div>
        );
    }
}