import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function Kalenda(props){
    const [value, setValue] = useState(new Date());
    //const [eye, setEye] = useState(null);
    //console.log(value)

    //const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //useEffect(()=>{
    //    props.handleDateData(value);
    //});
    //if(value !== eye){
    //    props.handleDateData(value);
    //    setEye(value);
    //}
    function onChange(nextValue){
        props.handleDateData(nextValue);
        setValue(nextValue)
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    {
                        props.showDate ? <div style={{position: 'absolute', zIndex: '20', top: '80px'}}>
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