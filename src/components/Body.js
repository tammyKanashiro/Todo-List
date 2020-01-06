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
            this.setState({ items: res.data })
        }).catch(err => console.log(err));
    }

    handleChange = (input) => {
        const newItem = input;

        this.setState({inputItem: newItem});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newItem = this.state.items.concat(this.state.inputItem);

        this.setState({
          items: newItem
        })

        axios.post('http://localhost:5000/newitem', { newItem })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
        
    }
    
    handleClick = (item) => {
    
        const removeItem = this.state.items.filter(i => {
            return i !== item;
        });
        
        this.setState({items: [...removeItem]})
    }

    render(){

        const { handleClick } = this;
        const { onSubmit } = this;
        const { handleChange } = this;

        return(
            <div className="Todo-table">
              <form action="/newitem" method="POST">
                <input type="text" onChange={(e) => handleChange(e.target.value)} name="newItem"placeholder="Add new item... " required></input>
                <button type="submit" onClick={onSubmit}>Add Item</button>
              </form>
              <ul>
                {this.state.items.map((item) => (
                    <li key={item.toString()} onClick={(e) => handleClick(item)}>{item}</li>
                ))}
                
              </ul>
            </div>
        );
    }
}

export default Body;