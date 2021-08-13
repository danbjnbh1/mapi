import './App.css';
import React, { useEffect } from 'react';
import Map from './Map/Map';
import LayersMenu from './LayersMenu/LayersMenu';

function App() {
  useEffect(() => {
    // window.govmap.createMap('map', {
    //   token: '5a4b8472-b95b-4687-8179-0ccb621c7990',
    //   layers: [
    //     'GASSTATIONS',
    //     'PARCEL_HOKS',
    //     'KSHTANN_ASSETS',
    //     'bus_stops',
    //     'PARCEL_ALL',
    //   ],
    //   showXY: true,
    //   identifyOnClick: true,
    //   isEmbeddedToggle: false,
    //   background: '1',
    //   layersMode: 1,
    //   zoomButtons: false,
    // });
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      {/* <div id="map" style={{ width: '600px', height: '600px' }}></div> */}
      {/* <Map />  */}
      <LayersMenu />
    </div>
  );
}

export default App;
