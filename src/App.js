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


  getStoriesFromApi = ( newsApiCallUrl ) => {
    const that = this;

      fetch( newsApiCallUrl )
      .then(function(response) {
        if (response.status >= 400) {
          console.log("The news api doesn't seem available right now");
          return;
        }
        return response.json();
      })
      .then(function(data) {

        localStorage.setItem( 'newsStoreLocal', JSON.stringify( data.articles ) );
        // dev todo: store the id of the news feed call also, and the apiurl
        that.getStories();

      })

  }


  getStories = ( newsApiCallUrl ) => {
    const that = this;

    if (localStorage.getItem("newsStoreLocal") !== null) {

      // dev todo: fix the above conditional to look for id of news feed call so it can work with multiple feeds and be more useful
      const newsStoreLocal = JSON.parse(localStorage.getItem( 'newsStoreLocal' ));

      this.setState({
        stories: newsStoreLocal,
        lastUpdated: new Date()
      });

      window.scrollTo(0, 0);

      that.toggleNav()

    } else {

      console.log('does not have localstorage')

      this.getStoriesFromApi( newsApiCallUrl );

    }

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
        
        <Header actionToggleNav={this.toggleNav} actionUpdateApiUrl={this.getStoriesFromApi} actionUpdateHeaderTitle={this.updateHeaderTitle} countryCode={this.state.countryCode} countryName={this.state.countryName} headerTitle={this.state.headerTitle} />
        
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
    this.getStoriesFromApi( this.state.newsApiUrl );
    this.getCountryCode();
  }

}

export default App;
