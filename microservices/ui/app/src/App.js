import React, { Component } from 'react'
import ProviderSpecBuilder from './ProviderSpecBuilder'
class App extends Component {

  render() {
    return (
      <div>
        <h1>kubeformation.sh</h1>
        <h2>Provide your specifications</h2>
        <div className='row'>
          <div className='col-sm-1'/>
          <div className='col-sm-10'>
            <ProviderSpecBuilder />
          </div>
        </div>
      </div>
    );
  }
}


export default App;
