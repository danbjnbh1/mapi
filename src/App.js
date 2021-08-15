import './App.css';
import React, { useState } from 'react';
import Map from './Map/Map';
import LayersMenu from './LayersMenu/LayersMenu';

function App() {

  const [checkedLayers, setCheckedLayers] = useState(new Set());

  return (
    <div className="App">
      <header className="App-header"></header>
      <Map checkedLayers={checkedLayers} />
      <LayersMenu
        checkedLayers={checkedLayers}
        setCheckedLayers={setCheckedLayers}
      />
    </div>
  );
}

export default App;
