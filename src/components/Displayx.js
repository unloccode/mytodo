import React from 'react';

class ProductRow extends React.Component{
    render(){
        const product = this.props.product;
        return(
            <tr>
                <td>{product.tskHead}</td>
                <td>{product.tksBody}</td>
            </tr>
        );
    }
}

export default class Displayx extends React.Component{
    render(){
        //const arr = this.props.data;
        const rows = [];
        //rows.push(<ProductRow dt={arr} key={arr.taskHead}/>);
        //console.log(rows);
        this.props.data.forEach((product)=>{
            console.log(product);
            rows.push(<ProductRow product={product} key={product.tskHead} />);
            //increment the index
        });
        
        return(
            <table>
            <thead>
                <tr>
                    <th>A</th>
                    <th>B</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
        );
    }
}