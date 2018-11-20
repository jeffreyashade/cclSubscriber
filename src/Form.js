import React, { Component } from 'react';
import './App.css';
import Input from './Input';

class Form extends Component {

      state = {
        mode: 'create',
        //failed to get a dynamic version to work, so I am hardcoding
        // Tried: '<h3>You are in <b>' + {this.state.mode}.toUpperCase() + '</b> mode!</h3>'
        // and other variations
        create: <h4>You are in <b>CREATE</b> mode!</h4>,
        search: <h4>You are in <b>SEARCH</b> mode!</h4>
      }

      handleClick = () => {
        let mode = (this.state.mode === 'create') ? 'search':'create';
        this.setState({mode});
      }

      render() {

        let message = this.state.mode;

        return (
          <div className="container gradient mt-5">
            <h1>CCL Sign-Up</h1>

            <div className="row">
                <div className="col-12 mb-3">
                  <Input mode={this.state.mode} />
                </div>
                <div id="toggleContain">
                  <ul id="message" className="list-group mb-3">
                  </ul>
                  <span id="switchMsg">{this.state[message]}</span>
                  <label className="switch">
                    <input type="checkbox" id="toggleMode" onClick={this.handleClick}/>
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="col-12">
                    <ul className="list-group mb-3">
                    </ul>
                </div>
                <div id="userReturn"></div>
            </div>
          </div>
        );
      }
}

export default Form;
