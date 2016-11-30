import React from 'react';
import {render} from 'react-dom';

// Stylesheets
require('./style.scss');

class App extends React.Component {
  render () {
    return <p>Hello Martin!</p>;
  }
}

render(<App/>, document.getElementById('app'));