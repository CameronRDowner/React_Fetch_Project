import React from 'react';
import './App.scss';
import { ItemList } from './components/ItemList/ItemList';

function App() {
  return (
    <div className="app-wrapper">
        <h1>Fetch Item App</h1>
      <ItemList/>
    </div>
  );
}

export default App;
