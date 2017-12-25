import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super();

    this.state = {
      stories: [],
      lastUpdated: new Date()
    }

  }

  deepCopy = (obj) => {
    if (obj !== undefined && obj !== null) {
      return JSON.parse(JSON.stringify(obj));
    }
    return null;
  }
  

  fetchStories = (sourceid) => {
    var that = this;

    fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news,cnn,the-economist,time,ars-technica,the-washington-post&apiKey=f2bd828e06724a59821444aaec0469dc')
    .then(function(response) {
      if (response.status >= 400) {
        // throw new Error("The news api doesnt seem available right now");
        console.log("The news api doesn't seem available right now");
        return;
      }
      return response.json();
    })
    .then(function(data) {

      that.setState({
        stories: data.articles,
        lastUpdated: new Date()
      });

      window.scrollTo(0, 0);

    })
  }


  componentDidMount() {
    var that = this;
    this.fetchStories(that.props.currentsource);
  }


  render() {
    return (

      <div className="newslist__list">
        {this.state.stories.map(function(story,i){
          return (

            <article key={i + '-' + story.url} tabIndex="0" itemScope itemType="http://schema.org/NewsArticle">
              <a href={story.url} className="newslist__item" target="_blank">
                <div className="newslist__source">
                  <div className="newslist__source-image" style={{backgroundImage: "url(http://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1)"}} itemProp="image">
                  </div>
                  <div className="newslist__source-name">
                    {story.source.name}
                  </div>
                </div>
                <div className="newslist__content" itemProp="articleBody">
                  <div className="newslist__title" itemProp="headline">
                    {story.title}
                  </div>
                  <div className="newslist__excerpt" itemProp="description">
                    {story.description}
                  </div>
                  <div className="newslist__timestamp" itemProp="dateCreated">
                    {moment(story.publishedAt).fromNow()}
                  </div>
                </div>
                <div className="newslist__image" style={{backgroundImage: "url(" + story.urlToImage + ")"}}>
                </div>
              </a>
            </article>

          );
        })}
        
      </div>

    );
  }
}

export default App;
