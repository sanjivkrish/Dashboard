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
    const response = await axios.get('https://api.opendota.com/api/proMatches');
    console.log(response)
    this.setState({matchesInfo: response.data})
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
