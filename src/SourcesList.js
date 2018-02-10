import React, { Component } from 'react';
import './App.css';

class SourcesList extends Component {

  constructor(props) {
    super();

    this.state = {
      sourcesCurrent: 'test'
    }

  }

  updateCurrentSources = (nextprops) => {

    let sourcesAll = '';

    if ( this.props.stories !== nextprops.stories ) {

      nextprops.stories.forEach(function(story) {

        if ( ! sourcesAll.includes( story.source.name ) ) {
          sourcesAll = sourcesAll + ' ' + story.source.name;
        }

      })

      this.setState({
        sourcesCurrent: sourcesAll
      })

    }

  }

  componentWillReceiveProps(nextprops) {
    this.updateCurrentSources(nextprops);
  }


  render() {
    const that = this;

    return (

      <div className="sources">
        <div className="sources__title">Sources:</div> {this.state.sourcesCurrent}
      </div>

    );
  }
}

export default SourcesList;
