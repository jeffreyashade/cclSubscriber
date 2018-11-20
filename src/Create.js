import React, { Component } from 'react';
import './App.css';
import fire from './fire';

class Create extends Component {

  state = {
    table: fire.database().ref('subscribers'),
    fName: '',
    lName: '',
    email: '',
    enteredOn: ''
  }

  state = {
    table: fire.database().ref('list'),
    rows: [],
    name:"",
    location:""
  }

  componentDidMount(){
    //We are using firebase to request a response from our table
    //The response is a higher order function object (don't ask - lol - I mean...do)
    //We then build a simple array of rows
    this.state.table.on('value', (response) => {
      let objects = response.val();
      let rows = [];
      for(let key in objects) {
        let row = objects[key];
        row.key = key;
        rows.push(row);
      }
      this.setState({rows});
    });
  }

  handleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  }

  add = (event) => {
    event.preventDefault();
    if(this.state.name){
      let row = {
        name: this.state.name,
        location: this.state.location
      }
      this.state.table.push(row);
      this.setState({name:""});
    }
  }

  delete = (row) => {
    this.state.table.child(row.key).remove();
  }


  handleHover = () => {
    //$('#addUser').css('color', '#5A7931') - no bueno
    document.getElementById('addUser').style.backgroundColor = '#5A7931';
  }

  handleMouseOff = () => {
    document.getElementById('addUser').style.backgroundColor = '#9BC23B';
  }

  handleClick = () => {

  }

  render() {
    return (
        <button id="addUser" className="btn" onClick={this.handleClick} onMouseOver={this.handleHover} onMouseLeave={this.handleMouseOff}><i className="fa fa-plus"></i></button>
    );
  }
}
export default Create;
