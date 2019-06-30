import React, { Component } from 'react';
import './App.css';
import PhoneBook from './Employee';

class App extends Component {
  constructor(props)
  {
    super();
  
  }
 
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-12">
         <h1>React JS TestDrive </h1>
          <PhoneBook/>
        </div>
        </div>
       </div>
    );
  }
}

export default App;
