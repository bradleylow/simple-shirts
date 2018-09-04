import React, { Component } from 'react';
import './assets/css/tailwind.css';
import './assets/css/main.css';

import Layout from './components/Layout/Layout';
import Shop from './containers/Shop/Shop';

class App extends Component {
  render() {
    return (
        <Layout>
            <Shop />
        </Layout>
    );
  }
}

export default App;
