import React, { Component } from 'react';
import './App.css';
import Newslist from './Newslist';
import Header from './Header';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navtoggled: false
    };
    this.toggleNav = this.toggleNav.bind(this)
  }

  toggleNav() {
    this.setState({
      navtoggled: !this.state.navtoggled
    });
  }

  render() {
    return (
      <div className={this.state.navtoggled ? "is-nav-toggled-yes" : ""}>
        
        <Header onClick={this.toggleNav} />
        
        <main id="main" className="main" tabIndex="0">
          
          <div className="newslist newslist--main">
            
            <Newslist />
          
          </div>
        </main>

      </div>
    );
  }
}

export default App;
