import React, { Component } from 'react';
import './assets/css/main.css';
import './assets/css/tailwind.css';

import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
        <Layout>
            <div className="container mx-auto">
                hi
            </div>
        </Layout>
    );
  }
}

export default App;
