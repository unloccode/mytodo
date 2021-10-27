import React from 'react';

export default class Lux extends React.Component{
    componentDidMount(){
        console.log('This is just a test');
        const ssd = [
            {name: 'George', color: 'Black', time: '15:48', timeStamp: '27102021'},
            {name: 'Jayden', color: 'Red', time: '13:23', timeStamp: '27102021'},
            {name: 'Miles', color: 'Green', time: '16:01', timeStamp: '26102021'},
            {name: 'Thanos', color: 'Yellow', time: '11:31', timeStamp: '28102021'},
            {name: 'Tiger', color: 'Purple', time: '19:52', timeStamp: '29102021'},
            {name: 'Wall', color: 'Paige', time: '16:15', timeStamp: '23102021'},
        ];
        //console.log(ssd);
        ssd.forEach((x)=>{
            //console.log(x.timeStamp);
            if(x.timeStamp === '27102021'){
                console.log(x);
            }
        })
    }
    render(){
        return(
            <div>
            </div>
        );
    }
}