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
      newsApiUrl: 'https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,the-economist,time,ars-technica,the-washington-post&apiKey=f2bd828e06724a59821444aaec0469dc',
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


  fetchStories = ( newsApiCallUrl ) => {
    const that = this;

    if ( newsApiCallUrl === that.state.newsApiUrl ) {

      return false;

    } else {
      
      that.getStoriesFromApi( newsApiCallUrl );

    }

  }


  getStoriesFromApi = ( newsApiCallUrl ) => {
    const that = this;

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

      localStorage.setItem( 'newsStoreLocal', JSON.stringify( data.articles ) );

      that.getStoriesLocalStore();

    })

  }


  getStoriesLocalStore = () => {

    if (localStorage.getItem("newsStoreLocal") !== null) {

      const newsStoreLocal = JSON.parse(localStorage.getItem( 'newsStoreLocal' ));

      this.setState({
        stories: newsStoreLocal,
        lastUpdated: new Date()
      });

      window.scrollTo(0, 0);
    } else {
      console.log('d oing this thing that you dont want me to do');
      this.getStoriesFromApi( this.state.newsApiCallUrl );
    }

  }


  updateApiUrl = ( newsApiUrlNew ) => {
    const that = this;

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


  updateHeaderTitle = ( headerTitleNew ) => {
    const that = this;

    this.setState({
      headerTitle: headerTitleNew
    });
  }


  componentWillMount() {
    console.log('willmount');
  }


  render() {
    return (
      <div className={this.state.navtoggled ? "is-nav-toggled-yes" : ""}>
        
        <Header actionToggleNav={this.toggleNav} actionUpdateApiUrl={this.updateApiUrl} actionUpdateHeaderTitle={this.updateHeaderTitle} countryCode={this.state.countryCode} countryName={this.state.countryName} headerTitle={this.state.headerTitle} />
        
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
    // var that = this;
    // console.log(nextState);
  }


  componentDidMount() {
    this.getStoriesFromApi( this.state.newsApiUrl );
    this.getCountryCode();
  }

}

export default App;
