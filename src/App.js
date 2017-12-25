import React, { Component } from 'react';
import './App.css';
import Newslist from './Newslist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main id="main" className="main" tabIndex="0">
          <div className="logo">lofi.news</div>
          <div className="newslist newslist--main">
            <header className="newslist__heading">
              Headlines - Global
            </header>
            
            <Newslist />
          
          </div>
        </main>

      </div>
    );
  }
}

export default App;
