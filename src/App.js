import './App.css';
import React, { useState } from 'react';
import Map from './Map/Map';
import LayersMenu from './LayersMenu/LayersMenu';

function App() {

  const [checkedLayers, setCheckedLayers] = useState(new Set());
  const [transparency, setTransparency] = useState(0)

  return (
    <div className="App">
      <header className="App-header"></header>
      <Map transparency={transparency} checkedLayers={checkedLayers} />
      <LayersMenu
        setTransparency={setTransparency}
        checkedLayers={checkedLayers}
        setCheckedLayers={setCheckedLayers}
      />
    </div>
  );
}

export default App;
