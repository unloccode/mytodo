import React from 'react';
import Popup from 'reactjs-popup'

class Letspopup extends React.Component{
    render(){
        return(
            <div className="">
                <Popup trigger={<button className="btn btn-primary">Trigger</button>} position="bottom right" arrow={false}>
                    <div className="card mt-3">
                        <div className="card-body">
                            <h3>Hello World!</h3>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default Letspopup;