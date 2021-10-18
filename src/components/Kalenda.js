import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function Kalenda(props){
    const [value, onChange] = useState(new Date());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    {
                        props.showDate ? <div style={{position: 'absolute', zIndex: '20'}}>
                                            <Calendar
                                                onChange={onChange}
                                                value={value}
                                            />
                                        </div>
                                        : <span></span>
                    }
                </div>
            </div>
        </div>
    );
}