import React, { Component } from 'react';
import './App.css';
//import fire from './fire';

class Search extends Component {

  state = {
    fName: this.props.fname,
    lName: this.props.lname,
    email: this.props.email,
    enteredOn: this.props.enteredOn
  }
  // state = {
  //   table: fire.database().ref('list'),
  //   rows: [],
  //   name:"",
  //   location:""
  // }

  // componentDidMount(){
  //   //We are using firebase to request a response from our table
  //   //The response is a higher order function object (don't ask - lol - I mean...do)
  //   //We then build a simple array of rows
  //   this.state.table.on('value', (response) => {
  //     let objects = response.val();
  //     let rows = [];
  //     for(let key in objects) {
  //       let row = objects[key];
  //       row.key = key;
  //       rows.push(row);
  //     }
  //     this.setState({rows});
  //   });
  // }

  // delete = (row) => {
  //   this.state.table.child(row.key).remove();
  // }

  // render(){
  //   let rows = this.state.rows.map(row =>
  //     <li key={row.key} className="list-group-item">
  //       {row.name} is in {row.location}
  //       <button onClick={clickEvent => this.delete(row)} className="btn btn-danger float-right">
  //         <i className="fa fa-trash"></i>
  //       </button>
  //     </li>
  //   );

  render() {
    return (
          <button id="searchUser" className="btn btn-primary"><i className="fa fa-search"></i></button>
    );
  }
}
export default Search;
