import React from 'react';

export default class TodoButtonTracker extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div>
                            <button className="mb-2" disabled style={{padding: '4px 25px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '10px', color: 'black', border: 'none'}}>Todos</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}