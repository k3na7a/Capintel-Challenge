import React from 'react';
import '../Assets/Stylesheets/App.css';
import Ticker from '../features/ticker/ticker';

function App() {
  return (
    <div className="App">
      <React.Fragment>                
        <Ticker />              
      </React.Fragment>
    </div>
  );
}

export default App;
