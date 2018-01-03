import React, { Component } from 'react';
import './App.css';

class Header extends Component {
  
  toggleNav() {    
    this.props.actionToggleNav();
  }

  updateApiUrl( apiUrl ) {    
    this.props.actionUpdateApiUrl( apiUrl );
  }

  componentDidMount() {
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
              <li className="offscreen-nav__item"><a href="#" onClick={() => this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,the-economist,time,ars-technica,the-washington-post&apiKey=f2bd828e06724a59821444aaec0469dc')}>Headlines - Global</a></li>
              <li className="offscreen-nav__item"><a href="#" onClick={() => this.updateApiUrl('https://newsapi.org/v2/top-headlines?country=' + this.props.countryCode + '&apiKey=f2bd828e06724a59821444aaec0469dc')}>Headlines - {this.props.countryName}</a></li>
              <li className="offscreen-nav__item"><a href="#" onClick={() => this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=buzzfeed,hacker-news,crypto-coins-news,engadget,ars-technica,mashable,recode,reddit-r-all,techcrunch,wired&apiKey=f2bd828e06724a59821444aaec0469dc')}>Headlines - Tech</a></li>
              <li className="offscreen-nav__item"><a href="#" onClick={() => this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news,&apiKey=f2bd828e06724a59821444aaec0469dc')}>Headlines - Modern</a></li>
              <li className="offscreen-nav__item"><label><input type="text" className="offscreen-nav__search" placeholder="Search 5000 sources..." /></label></li>
              <li className="offscreen-nav__item offscreen-nav__item--photos">
                <input type="checkbox" id="checkbox-images" className="u-checkbox offscreen-nav__checkbox" defaultChecked />
                <label className="u-checkbox-label" htmlFor="checkbox-images">Show images on articles</label>
              </li>
              <li className="offscreen-nav__item offscreen-nav__item--small">
                <div>news feed by</div> <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">newsapi.org</a>
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