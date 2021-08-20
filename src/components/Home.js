import React from 'react';

import AppNav from './AppNav';

class Home extends React.Component{
    render(){
        return(
            <div className="container-expand">
                <div className="row">
                    <div className="col-sm-12">
                        <AppNav/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;