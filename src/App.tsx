import React from 'react';
import './App.css';
import { ItemList } from './components/ItemList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fetch Hiring App</h1>
      </header>
      <ItemList></ItemList>
    </div>
  );
}

export default App;
