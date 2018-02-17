import React, { Component } from 'react';
import './App.css';

class SourcesList extends Component {

  constructor(props) {
    super();

    this.state = {
      sourcesCurrent: ''
    }

  }

  updateCurrentSources = (nextprops) => {

    let sourcesAll = '';

    if ( this.props.stories !== nextprops.stories ) {
      
      nextprops.stories.forEach(function(story, i) {
        
        const comma = ( i > 0 ? ',' : '' )

        if ( ! sourcesAll.includes( story.source.name ) ) {
          sourcesAll = sourcesAll + comma + ' ' + story.source.name;
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
