import React, { Component } from 'react';
import './App.css';
import fire from './fire';


class Input extends Component {

  state = {
    table: fire.database().ref('subscribers'),
    rows: [],
    fName: '',
    lName: '',
    email: '',
    enteredOn: '',
    searchResult: [],
    message: null,
    mode: 'create',
    create: <h4>You are in <b>CREATE</b> mode!</h4>,
    search: <h4>You are in <b>SEARCH</b> mode!</h4>,
    listId: null,
    deleteMsg: null

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
    document.getElementById('addUser').disabled = false;
    document.getElementById('searchUser').disabled = true;
  }

  alertCss = () => {
    document.getElementById('message').style.backgroundColor = '#90251B';
    document.getElementById('message').style.padding = '2px';
  }

  confirmCss = () => {
    document.getElementById('message').style.backgroundColor = '#9BC23B';
    document.getElementById('message').style.padding = '2px';
  }

  resetMsg = () => {
    let message = null;
    document.getElementById('message').style.padding = '0px';
    this.setState({message});
  }

  handleToggle = () => {
      let mode = (this.state.mode === 'create') ? 'search':'create';
      this.setState({mode});
      if(mode === 'search') {
        document.getElementById('addUser').disabled = true;
        document.getElementById('searchUser').disabled = false;
      }
      else {
        document.getElementById('addUser').disabled = false;
        document.getElementById('searchUser').disabled = true;
      }
      let searchResult = null;
      let message = null;
      this.setState({searchResult, message});
      this.resetMsg();
    }

  handleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    console.log(today);

    this.setState({
      [name]: value,
      enteredOn: today
    });
  }

  add = (event) => {
    event.preventDefault();

    let data = this.state.rows;
    let duplicateValue = false;
    this.resetMsg();

    if(this.state.fName && this.state.lName && this.state.email){
      for (let index in data) {
        let datum = data[index];

        if(datum.email.toUpperCase() === this.state.email.toUpperCase()) {
          duplicateValue = true;
          let message = <li>This email is already in use.</li>;
          this.alertCss();
          this.setState({message});

          return null;
          }
      }

      let selectValue = document.getElementById("selectChapter").value;
      let chapterName = () => {
        if (selectValue === '639ef6aa59') { return 'Intown Atlanta'; }
        else if(selectValue === '966b5a9afa') { return 'North Atlanta'; }
        else if(selectValue === '8b975d0096') { return 'Georgia Masterlist'; };
      }
      console.log(selectValue);
      let message = <li>{this.state.fName} {this.state.lName} has been added to {chapterName()}!</li>;
      this.confirmCss();
      this.setState({message});
      let row = {
        fName: this.state.fName,
        lName: this.state.lName,
        email: this.state.email,
        enteredOn: this.state.enteredOn
      }
      this.state.table.push(row);
      this.setState({fName:"", lName:"", email:"", enteredOn:""});
    }
    else {
      let message = <li>Please fill out all fields before submitting.</li>;
      this.alertCss();
      this.setState({message});
    }
  }

  deleteCheck = (key) => {
    let users = this.state.rows;
    let userObj = null;
    for (let index in users) {
      let user = users[index];
      if (user.key === key) {
        userObj = user;
      }
    }

    let deleteMsg =
        <div className="overlay">
            <div className="popup">
              <p>Are you sure you want to unsubscribe {userObj.fName} {userObj.lName} from the distribution list?</p>
              <div className="text-right">
                <button onClick={this.cancel} className="btn btn-cancel">Cancel</button>
                <button onClick={clickEvent => this.delete(key)} className="btn btn-primary">Ok</button>
              </div>
            </div>
          </div>
    this.setState({deleteMsg});
    console.log('check launched!')
  }

  cancel = (event) => {
    event.preventDefault();
    let deleteMsg = null;
    this.setState({deleteMsg});
  }

  delete = (row) => {
    this.state.table.child(row).remove();
    let deleteMsg = null;
    this.setState({deleteMsg});
    console.log('delete called');
    document.getElementById(row).remove();
  }

  handleHover = (event) => {
    event.preventDefault();
    //$('#addUser').css('color', '#5A7931') - no bueno
    document.getElementById('addUser').style.backgroundColor = '#5A7931';
  }

  handleMouseOff = (event) => {
    event.preventDefault();
    document.getElementById('addUser').style.backgroundColor = '#9BC23B';
  }

  search = (event) => {
    event.preventDefault();
    let data = this.state.rows;
    let searchResult = [];
    let message = '';
    let resultFound = false;
    this.setState({searchResult});
    this.resetMsg();

    console.log(this.state.message, this.state.searchResult);
    for (let index in data) {
      let datum = data[index];
      console.log(datum.fName, this.state.fName, datum.lName, this.state.lName, datum.email, this.state.email);
      if(datum.fName.toUpperCase() === this.state.fName.toUpperCase() || datum.lName.toUpperCase() === this.state.lName.toUpperCase() || datum.email.toUpperCase() === this.state.email.toUpperCase()) {
        searchResult.push(<li key={datum.key} id={datum.key} className="list-group-item">{datum.fName} {datum.lName} created on {datum.enteredOn}<button onClick={clickEvent => this.deleteCheck(datum.key)} className="trash btn btn-danger float-right"><i className="fa fa-trash"></i></button></li>);
        resultFound = true;
    }

}
if(resultFound === false) {
  message = 'No matches found';
  this.alertCss();
}
  this.setState({searchResult, message});
  this.setState({fName:"", lName:"", email:"", enteredOn:""});
}
  render() {
      let modeId = this.state.mode;

    //   let test = this.state.rows.map(row =>
    //   //   if (row.email === this.state.email)
    //   // }
    //     <li key={row.key} className="list-group-item">
    //       {row.fName} {row.lName} created on {row.enteredOn}
    //       <button onClick={clickEvent => this.delete(row)} className="trash btn btn-danger float-right">
    //         <i className="fa fa-trash"></i>
    //       </button>
    //     </li>
    //     );
    // this.setState({test})

    return (
      <div>

      <div className="container gradient mt-5">
          <h4><b>CCL</b> sign-up: <select id="selectChapter" className="btn dropdown-toggle">
        <option id="Intown Atlanta" value="639ef6aa59">Intown Atlanta</option>
        <option id="North Atlanta" value="966b5a9afa">North Atlanta</option>
        <option id="Georgia" value="8b975d0096">Georgia Masterlist</option></select></h4>
        <div className="row">
            <div className="col-12 mb-3">

      <div>
      <form id="formAddUser" className="bg-dark rounded p-3 text-right" autoComplete="off">
          <div className="form-group">
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <div className="input-group-text"><i className="fa fa-user"></i></div>
                </div>
                <input id="fName" type="text" className="form-control"
                  name="fName"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={this.state.fName}
                />
            </div>
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <div className="input-group-text"><i className="fa fa-user"></i></div>
                </div>
                <input id="lName" type="text" className="form-control"
                  placeholder="Last Name"
                  name="lName"
                  onChange={this.handleChange}
                  value={this.state.lName} />
            </div>
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <div className="input-group-text"><i className="fa fa-envelope"></i></div>
                </div>
                <input id="email" type="text" className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
            </div>
          </div>

          <button id="addUser" className="btn btn-success"
            onClick={this.add}
            onMouseOver={this.handleHover}
            onMouseLeave={this.handleMouseOff}
            ><i id="addIcon" className="fa fa-plus"></i></button>

            <button id="searchUser" className="btn btn-primary"
                onClick={this.search}><i className="fa fa-search"></i></button>
      </form>
      <ul id="results"></ul>
        {this.state.searchResult}
      </div>
      <span id="overlay">{this.state.deleteMsg}</span>
      </div>
      <div id="toggleContain">
        <span id="switchMsg">{this.state[modeId]}</span>
        <label className="switch">
          <input type="checkbox" id="toggleMode" onClick={this.handleToggle}/>
          <span className="slider round"></span>
        </label>
        <ul className="list-group mb-3" id="message">{this.state.message}</ul>
      </div>
      <div className="col-12">
          <ul className="list-group mb-3">
          </ul>
      </div>
      <div id="userReturn"></div>
  </div>
  <img id="logo" src={require('./CCL/ccl-horizontal-1850.png')} /><br />
</div>
</div>
    );
  }
}
export default Input;
