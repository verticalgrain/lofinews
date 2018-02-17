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

  updateHeaderTitle( headerTitleNew ) {
    this.props.actionUpdateHeaderTitle( headerTitleNew );
  }

  handleSubmit = (event) => {

    event.preventDefault();

    var topSources = [];

    fetch( 'https://newsapi.org/v2/sources?apiKey=f2bd828e06724a59821444aaec0469dc' )
    .then(function(response) {
      if (response.status >= 400) {
        // throw new Error("The news api doesnt seem available right now");
        console.log("The news api doesn't seem available right now");
        return;
      }
      return response.json();
    })
    .then(function(data) {
      
      topSources = data.sources;

    })

    var searchEncoded = encodeURI( event.target.search.value );

    this.updateApiUrl('https://newsapi.org/v2/everything?q=' + searchEncoded + '&sources=' + topSources + '&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc')
  
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
              <li className="offscreen-nav__item offscreen-nav__item--search">
                <form onSubmit={this.handleSubmit}>
                  <label><input type="text" name="search" className="offscreen-nav__search" placeholder="Search top 134 sources..." /></label>
                  {/* //dev todo: add sort options, add sources include / exclude options, checkbox for major sources only (checked by default), date range, language */}
                  <input type="submit" className="offscreen-nav__submit" />
                </form>
              </li>
              {
                (( this.props.countryCode.trim() !=="" ) || ( this.props.countryCode.trim().length !== 0 ))
                ? <div><li className="offscreen-nav__item offscreen-nav__title">Local</li>
                  <li className="offscreen-nav__item">
                    <input type="radio" name="nav" id="country" onClick={() => { this.updateHeaderTitle('Headlines - ' + this.props.countryName); this.updateApiUrl('https://newsapi.org/v2/top-headlines?country=' + this.props.countryCode + '&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                    <label className="offscreen-nav__item-name" htmlFor="country">{this.props.countryName}</label>
                  </li></div>
                : <div></div>
              }
              <li className="offscreen-nav__item offscreen-nav__title">Headlines</li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="global" onClick={() => { this.updateHeaderTitle( 'Headlines - Global' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=associated-press,bbc-news,cnn,the-economist,time,the-washington-post,the-guardian-uk,wired,reuters,rte&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="global">Global</label>
              </li>
              {/*<li className="offscreen-nav__item"><a onClick={() => { this.toggleItem( true ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?category=technology&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />Tech</a></li>*/}
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="tech" onClick={() => { this.updateHeaderTitle( 'Headlines - Tech & Futurism' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=buzzfeed,hacker-news,crypto-coins-news,engadget,ars-technica,mashable,recode,reddit-r-all,techcrunch,techradar,the-next-web,wired,next-big-future&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="tech">Tech & Futurism</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="science" onClick={() => { this.updateHeaderTitle( 'Headlines - Science' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=new-scientist,national-geographic&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="science">Science</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="newmedia" onClick={() => { this.updateHeaderTitle( 'Headlines - New Media' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-verge,vice-news,axios&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="newmedia">New Media</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="finance" onClick={() => { this.updateHeaderTitle( 'Headlines - Finance' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=bloomberg,business-insider,financial-post,financial-times,fortune,the-economist&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="finance">Finance</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="politics" onClick={() => { this.updateHeaderTitle( 'Headlines - Politics' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=politico,the-hill&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="politics">Politics</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="sports" onClick={() => { this.updateHeaderTitle( 'Headlines - Sports' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=nfl-news,nhl-news,the-sport-bible,fox-sports,espn,bbc-sport,talksport&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="sports">Sports</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="celeb" onClick={() => { this.updateHeaderTitle( 'Headlines - Celebrity Gossip' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=the-huffington-post,entertainment-weekly,buzzfeed,mashable,mirror&pageSize=50&language=en&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="celeb">Celebrity Gossip</label>
              </li>
              
              <li className="offscreen-nav__item offscreen-nav__title">Sources</li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="bbc" onClick={() => { this.updateHeaderTitle( 'BBC News' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="bbc">BBC</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="reuters" onClick={() => { this.updateHeaderTitle( 'Reuters' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=reuters&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="reuters">Reuters</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="cnn" onClick={() => { this.updateHeaderTitle( 'CNN' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=cnn&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="cnn">CNN</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="rt" onClick={() => { this.updateHeaderTitle( 'RT' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=rte&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="rt">RT English</label>
              </li>
              <li className="offscreen-nav__item">
                <input type="radio" name="nav" id="reddit" onClick={() => { this.updateHeaderTitle( 'Reddit /r/all' ); this.updateApiUrl('https://newsapi.org/v2/top-headlines?sources=reddit-r-all&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc') } } />
                <label className="offscreen-nav__item-name" htmlFor="reddit">Reddit-r-all</label>
              </li>
              <li className="offscreen-nav__item offscreen-nav__item--credits">
                <div>news feed provided by</div> <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">newsapi.org</a>
              </li>

            </ul>
          </div>
        </nav>
        <div className="header__title">
          {this.props.headerTitle}
        </div>
        <div className="logo">lofi.news</div>

      </header>

    );
  }
}

export default Header;