import React, { Component } from 'react';
import './App.css';

class Header extends Component {
  
  constructor(props) {
    super(props);
  }

  toggleNav() {    
    this.props.actionToggleNav();
  }

  updateApiUrl( apiUrl ) {    
    this.props.actionUpdateApiUrl( apiUrl );
  }

  componentDidUpdate() {
    
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
              <li className="offscreen-nav__item">
                <label><input type="text" className="offscreen-nav__search" placeholder="Search 5000 sources..." /></label>
              </li>
              <li className="offscreen-nav__item offscreen-nav__title">Headlines</li>
              <li className="offscreen-nav__item">
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,the-economist,time,ars-technica,the-washington-post&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc'); } }>Global</button>
                <span className="offscreen-nav__refresh" onClick={() => {  this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,the-economist,time,ars-technica,the-washington-post&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } }></span>
              </li>
              <li className="offscreen-nav__item">
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?country=' + this.props.countryCode + '&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } }>{this.props.countryName}</button>
                <span className="offscreen-nav__refresh" onClick={() => {  this.updateApiUrl('https://newsapi.org/v2/top-headlines?country=' + this.props.countryCode + '&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } }></span>
              </li>
              {/*<li className="offscreen-nav__item"><a onClick={() => { this.toggleItem( true ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?category=technology&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } }>Tech</a></li>*/}
              <li className="offscreen-nav__item">
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=buzzfeed,hacker-news,crypto-coins-news,engadget,ars-technica,mashable,recode,reddit-r-all,techcrunch,wired&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } }>Tech</button>
                <span className="offscreen-nav__refresh" onClick={() => {  this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=buzzfeed,hacker-news,crypto-coins-news,engadget,ars-technica,mashable,recode,reddit-r-all,techcrunch,wired&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } }></span>
              </li>
              <li className="offscreen-nav__item">
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } }>Modern</button>
                <span className="offscreen-nav__refresh" onClick={() => {  this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } }></span>
              </li>
              <li className="offscreen-nav__item">
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } }>Finance</button>
                <span className="offscreen-nav__refresh" onClick={() => {  this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } }></span>
              </li>
              <li className="offscreen-nav__item">
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } }>Politics</button>
                <span className="offscreen-nav__refresh" onClick={() => {  this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } }></span>
              </li>
              <li className="offscreen-nav__item">
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } }>Sports</button>
                <span className="offscreen-nav__refresh" onClick={() => {  this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } }></span>
              </li>
              <li className="offscreen-nav__item offscreen-nav__title">Sources</li>
              <li className="offscreen-nav__item">
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc'); } }>BBC</button>
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=cnn&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc'); } }>CNN</button>
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=reuters&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc'); } }>Reuters</button>
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=vice-news&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc'); } }>Vice</button>
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=rt&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc'); } }>RT</button>
                <button onClick={() => { this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=reddit-r-all&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc'); } }>Reddit-r-all</button>
              </li>
{/*              <li className="offscreen-nav__item offscreen-nav__item--photos">
                <input type="checkbox" id="checkbox-images" className="u-checkbox offscreen-nav__checkbox" defaultChecked />
                <label className="u-checkbox-label" htmlFor="checkbox-images">Show images on articles</label>
              </li>*/}
              <li className="offscreen-nav__item offscreen-nav__item--small">
                <div>news feed provided by</div> <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">newsapi.org</a>
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