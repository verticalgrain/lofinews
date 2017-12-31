import React, { Component } from 'react';
import './App.css';

class Header extends Component {
  
  toggleNav() {    
    this.props.onClick();
  }

  render() {

    return ( 

      <header className="header header--fixed">
        <a href="#main-content" className="u-visually-hidden" tabIndex="0">Skip to main content</a>
        <nav>
          <div className="nav-toggle" onClick={() => this.toggleNav()}>
          </div>
          <div className="offscreen-nav">
            <ul className="offscreen-nav__list">
              <li className="offscreen-nav__item"><a href="#">Headlines - Global</a></li>
              <li className="offscreen-nav__item"><a href="#">Headlines - Canada</a></li>
              <li className="offscreen-nav__item"><a href="#">Headlines - Global</a></li>
              <li className="offscreen-nav__item"><label><input type="text" className="offscreen-nav__search" placeholder="Search 5000 sources..." /></label></li>
              <li className="offscreen-nav__item offscreen-nav__item--photos">
                <input type="checkbox" id="checkbox-images" className="u-checkbox offscreen-nav__checkbox" defaultChecked />
                <label className="u-checkbox-label" htmlFor="checkbox-images">Show images on articles</label>
              </li>
              <li className="offscreen-nav__item offscreen-nav__item--small">
                <div>news feed by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">newsapi.org</a></div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="header__title">
          Headlines - Global
        </div>
        <div className="logo">lofi.news</div>

      </header>

    );
  }
}

export default Header;