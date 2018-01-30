import React, { Component } from 'react';
import './App.css';
import Newslist from './Newslist';
import Header from './Header';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navtoggled: false,
      newsApiUrl: 'https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,the-economist,time,ars-technica,the-washington-post&apiKey=f2bd828e06724a59821444aaec0469dc',
      stories: [],
      countryCode: '',
      countryName: ''
    };
    this.toggleNav = this.toggleNav.bind(this);
  }


  toggleNav() {
    this.setState({
      navtoggled: !this.state.navtoggled
    });

  }


  fetchStories = ( newsApiCallUrl ) => {
    const that = this;

    if ( newsApiCallUrl === that.state.newsApiUrl) {
      console.log(newsApiCallUrl);
      console.log( 'same api url so not updating' );

      return false;

    } else {
      
      console.log('fetching stories');
      that.getStoriesFromApi( newsApiCallUrl );

    }

  }


  getStoriesFromApi = ( newsApiCallUrl ) => {
    const that = this;

    console.log('calling the api to fetch stories...');
    fetch( newsApiCallUrl )
    .then(function(response) {
      if (response.status >= 400) {
        // throw new Error("The news api doesnt seem available right now");
        console.log("The news api doesn't seem available right now");
        return;
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      localStorage.setItem( 'newsStoreLocal', JSON.stringify( data.articles ) );

      that.getStoriesLocalStore();

    })

  }


  getStoriesLocalStore = () => {
    console.log('loading up stories from localstorage');

    if (localStorage.getItem("newsStoreLocal") !== null) {
      console.log('stories exist in localstorage')
      const newsStoreLocal = JSON.parse(localStorage.getItem( 'newsStoreLocal' ));
    
      console.log('setting stories in state')
      this.setState({
        stories: newsStoreLocal,
        lastUpdated: new Date()
      });

      window.scrollTo(0, 0);
    } else {
      console.log('stories do not exist in localstorage')
      this.getStoriesFromApi( this.state.newsApiCallUrl );
    }

  }


  updateApiUrl = ( newsApiUrlNew ) => {
    const that = this;
    console.log('changing the news api url to check out some new stories');

    that.fetchStories( newsApiUrlNew );

    this.toggleNav();
    window.scrollTo(0, 0);

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


  componentWillMount() {
  }


  render() {
    return (
      <div className={this.state.navtoggled ? "is-nav-toggled-yes" : ""}>
        
        <Header actionToggleNav={this.toggleNav} actionUpdateApiUrl={this.updateApiUrl} countryCode={this.state.countryCode} countryName={this.state.countryName} />
        
        <main id="main" className="main" tabIndex="0">
          
          <div className="newslist newslist--main">
            
            <Newslist stories={this.state.stories} />
          
          </div>
        </main>

      </div>
    );
  }


  componentWillUpdate(nextProps, nextState) {
    // var that = this;
    // console.log(nextState);
  }


  componentDidMount() {
    this.getStoriesFromApi( this.state.newsApiUrl );
    this.getCountryCode();
  }

}

export default App;
