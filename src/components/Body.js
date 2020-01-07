import React, { Component } from 'react';
import axios from 'axios';

class Body extends Component{

    constructor(props){
        super(props);

        this.state = {
            items: [],
            inputItem: '',
        };
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/')
        .then(res => {
            this.setState({ items: res.data });
            
        }).catch(err => console.log(err));
    }


    handleChange = (input) => {
        const newItem = input;

        this.setState({inputItem: newItem});
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const newItem = this.state.inputItem;

        console.log(newItem);

        axios.post('http://localhost:5000/' + { newItem })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
        //const newItem = this.state.items.concat(this.state.inputItem);
/*
        this.setState({
          items: this.state.items.concat(this.state.inputItem)
        })

        console.log('New:');
        console.log(newItem);*/
        
        
        
    }
    
    handleClick = itemName => {
    
        /*axios.delete('http://localhost:5000/' + itemName)
        .then(res => console.log(res.data));*/

        console.log(itemName.item)
        console.log(this.state.items);
        
        /*const removeItem = this.state.items.filter(i => {
            return i !== itemName;
        });*/

        const removeItem = this.state.items.filter(item => console.log(item));

        console.log('Final: ' +removeItem);
        /*
        this.setState({
            items: this.state.items.filter(data => data.item !== itemName)
        })*/


        
        
       // this.setState({items: [...removeItem]})
    }

    render(){

        const { handleClick } = this;
        const { onSubmit } = this;
        const { handleChange } = this;
        const { items = [ ]} = this.state.items;

        return(
            <div className="Todo-table">
              <form action="/newitem" method="POST">
                <input type="text" onChange={(e) => handleChange(e.target.value)} name="newItem"placeholder="Add new item... " required></input>
                <button type="submit" onClick={onSubmit}>Add Item</button>
              </form>
              <ul>
                {items.map((item) => (
                    <li key={item._id} onClick={() => handleClick(item)}>{item.item}</li>
                ))}
                
              </ul>
            </div>
        );
    }
}

export default Body;