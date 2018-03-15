import React, { Component } from 'react';
import logo from './logo.svg';
import ExpandCollapse from './ExpandCollapse';
import ExpandCollapseHeader from './ExpandCollapse/ExpandCollapseHeader';
import ExpandCollapseBody from './ExpandCollapse/ExpandCollapseBody';
import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ExpandCollapse isExpanded={true}>
        <ExpandCollapseHeader 
                expandedIcon={<img height="30px" width="30px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKUfZgdlcKi2AzRzy6Q0f_t2ohy5fVA_h6Izy91UWFp0Vmn5-iRw"/>}
                collapsedIcon={<img height="30px" width="30px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvyP3u1Lx8dBEup-gvVLgcvARH7JXO00obZIy5vCbZJ6-dOqdo"/>}
                clickableHeader={true}
                includeIcon={false}
                  >header</ExpandCollapseHeader>
        <ExpandCollapseBody classes="test-class"> body</ExpandCollapseBody>
    </ExpandCollapse>
      </div>
    );
  }
}

export default App;
