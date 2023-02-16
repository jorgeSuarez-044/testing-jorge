/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component , useEffect, useState } from "react";
import { render } from "react-dom";
import DataGrid from "./component/dataGrid";
import Head from './App';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }

  render() {
   
    return (
      <div>
    
        <hr />

        <hr />
        {<Head></Head>}
        {<DataGrid/>}
        <hr />
        <div>
          
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
