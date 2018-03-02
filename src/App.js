import React, { Component } from 'react';
import './App.css';
import Newslist from './Newslist';
import Header from './Header';
import SourcesList from './SourcesList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navtoggled: false,
      newsApiUrl: 'https://newsapi.org/v2/top-headlines?sources=associated-press,bbc-news,cnn,the-economist,time,the-washington-post,the-guardian-uk,wired,reuters,rte&pageSize=50&apiKey=f2bd828e06724a59821444aaec0469dc',
      stories: [],
      countryCode: '',
      countryName: '',
      headerTitle: 'Headlines - Global'
    };
    this.toggleNav = this.toggleNav.bind(this);
  }


  toggleNav() {
    this.setState({
      navtoggled: !this.state.navtoggled
    });
  }


  getStories = ( newsApiCallUrl ) => {
    const that = this;


    if (localStorage.getItem( newsApiCallUrl ) !== null && localStorage.getItem( newsApiCallUrl ) !== 'undefined' ) {

      console.log('does have localstorage');

      const newsStore = JSON.parse( localStorage.getItem( newsApiCallUrl ) );

      var storedDate = new Date( newsStore.lastUpdate );

      var currentDate = new Date();

      console.log( (currentDate - storedDate)/60000 );

      if ( (currentDate - storedDate)/60000 > 5 ) {

        console.log('localstorage is expired - fetching new stories')
        this.setStoriesLocalStorage( newsApiCallUrl );

      } else {
      
        console.log('loading cached stories from localstorage')  
        this.updateNewsList( newsApiCallUrl );
      
      }      

    } else {

      // Dev todo: break this out into a function that fetches stories and saves to local storage?
      console.log('does not have localstorage')

      this.setStoriesLocalStorage( newsApiCallUrl );

    }

  }


  updateNewsList = ( newsApiCallUrl ) => {
    const that = this;

    const newsStoreLocal = JSON.parse(localStorage.getItem( newsApiCallUrl ));

    this.setState({
      stories: newsStoreLocal.articles,
    });

    window.scrollTo(0, 0);

    that.toggleNav();

  }


  setStoriesLocalStorage = ( newsApiCallUrl ) => {
    const that = this;

    this.fetchStoriesFromApi( newsApiCallUrl ).then( storiesData => {

      var storiesObject = {
        lastUpdate: new Date(),
        articles: storiesData.articles
      }

      localStorage.setItem( newsApiCallUrl, JSON.stringify( storiesObject ) );

      this.updateNewsList( newsApiCallUrl );
    
    }, status => {

      // If fetch fails (network offline)
      console.log( status );
      // Dev todo: install notification package and add notification here if network is offline

    });

  }


  fetchStoriesFromApi = ( newsApiCallUrl ) => {
    const that = this;

    return fetch( newsApiCallUrl )
    .then(function(response) {
      if (response.status >= 400) {
        console.log("The news api doesn't seem available right now");
        return;
      }
      return response.json();
    })
    .then(function(json) {
      return json;
    })

  }


  getCountryCode = () => {
    var url = 'https://freegeoip.net/json/';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          countryCode: responseJson.country_code,
          countryName: responseJson.country_name
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  updateHeaderTitle = ( headerTitleNew ) => {
    const that = this;

    this.setState({
      headerTitle: headerTitleNew
    });
  }


  componentWillMount() {
  }


  render() {
    return (
      <div className={this.state.navtoggled ? "is-nav-toggled-yes" : ""}>
        
        <Header actionToggleNav={this.toggleNav} actionUpdateApiUrl={this.getStories} actionUpdateHeaderTitle={this.updateHeaderTitle} countryCode={this.state.countryCode} countryName={this.state.countryName} headerTitle={this.state.headerTitle} />
        
        <main id="main" className="main" tabIndex="0">
          
          <div className="newslist newslist--main">
            
            <SourcesList stories={this.state.stories} />

            <Newslist stories={this.state.stories} />
          
          </div>

        </main>

      </div>
    );
  }


  componentWillUpdate(nextProps, nextState) {
  }


  componentDidMount() {
    this.getStories( this.state.newsApiUrl );
    this.getCountryCode();
  }

}

export default App;
