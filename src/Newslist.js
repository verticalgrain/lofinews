import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super();

    // if (localStorage.getItem("newsStoreLocal") !== null) {
    //   const newsStoreLocal = JSON.parse(localStorage.getItem( 'newsStoreLocal' ));
    // }

    this.state = {
      lastUpdated: new Date()
    }

  }

  deepCopy = (obj) => {
    if (obj !== undefined && obj !== null) {
      return JSON.parse(JSON.stringify(obj));
    }
    return null;
  }
  

  stringToColor = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('99' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  // componentWillUpdate = () => {
  //   this.fetchStories(this.props.newsApiCallUrl);
  // }

  componentDidMount() {
  }

  render() {
    const that = this;

    return (

      <div className="newslist__list">
        {this.props.stories.map(function(story,i){
          // console.log(story);
          const barColor = that.stringToColor( story.source.name );
          // console.log(barColor);
          const barStyles = {
            background: barColor
          }

          return (

            <article key={i + '-' + story.url} tabIndex="0" itemScope itemType="http://schema.org/NewsArticle">
              <a href={story.url} className="newslist__item"  target="_blank">
                <div className="newslist__colorbar" style={barStyles}></div>
                <div className="newslist__content" itemProp="articleBody">
                  <div className="newslist__source" style={{display: "block",fontSize: "11px"}}>
                    {story.source.name}
                  </div>
                  <div className="newslist__title" itemProp="headline">
                    {story.title}
                  </div>
                  <div className="newslist__bullet">•</div>
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
