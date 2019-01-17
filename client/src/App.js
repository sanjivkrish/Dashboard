import React, { Component } from 'react';
import CustomPaginationActionsTable from './components/customTable';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      matchesInfo: [],
    };
  }
    
  async componentDidMount () {
    // Get match info from the open endpoint
    const response = await axios.get('https://api.opendota.com/api/proMatches');
  
    // If open endpoint is down, retrieve data from local server
    if (response.status >= 500) {
      const resFromLocalServer = await fetch('/matches');
      this.setState({matchesInfo: resFromLocalServer.data})
      return
    }
    
    // On success, save the latest match info locally
    this.setState({matchesInfo: response.data})
    await fetch('/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data),
    });
  };

  render() {
    return (
      <div className="App">
        <CustomPaginationActionsTable matchesInfo={this.state.matchesInfo}/>
      </div>
    );
  }
}

export default App;
