import React from 'react';
import './App.css';
import JitsiCall from '../src/components/JitsiCall';

function App() {
  return (
    <div className="App">
      <h1>Live Audio/Video Call with Jitsi</h1>
      <JitsiCall />
    </div>
  );
}

export default App;
