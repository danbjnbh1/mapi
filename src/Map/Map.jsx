import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Map.module.scss';
import JSITM from 'js-itm';

export default function Map(props) {
  const [layersSource, setLayersSource] = useState([]);
  const [bbox, setBbox] = useState();

  function handleApiLoaded(map, maps) {
    maps.event.addListener(map, 'bounds_changed', () => {
      console.log("chaned");
      const { mc, Eb } = map.getBounds();
      let firstBound = mc.i + ' ' + Eb.i;
      let secondBound = mc.g + ' ' + Eb.g;

      let bbox =
        JSITM.gpsRef2itmRef(firstBound) +
        ' ' +
        JSITM.gpsRef2itmRef(secondBound);
      bbox = bbox.replaceAll(' ', ',');
      setBbox(bbox);
    });
  }

  useEffect(() => {
    setLayersSource(() => {
      const newLayersSource = [];
      props.checkedLayers.forEach((layerId) => {
        newLayersSource.push(
          `{"source":{"type":"mapLayer","mapLayerId":${layerId}},"drawingInfo":{"transparency":${props.transparency}},"minScale":501000,'maxScale':0}`
        );
      });
      return newLayersSource.toString();
    });
  }, [props.checkedLayers, props.transparency]);

  const defaultProps = {
    center: { lat: 31.5, lng: 35.5 },
    zoom: 8,
  };

function creatMapOptions(){
  const israelBounds = {
    north: 34,
    south: 29,
    west: 33.1,
    east: 36.8,
  };
  return {
    minZoom: 8,
    restriction: {
      latLngBounds: israelBounds,
      strictBounds: false,
    },

  };
}


  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBGnXCINSRElxDs-0zKXbE0PUkqaObC48Y' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={creatMapOptions}
      ></GoogleMapReact>
      <img
        className={styles.layerImg}
        alt="layerImage"
        src={`https://ags.govmap.gov.il/proxy/proxy.ashx?http://govmap/arcgis/rest/services/AdditionalData/MapServer/export?dynamicLayers=[${layersSource}]&dpi=96&transparent=true&format=png32&&bbox=${bbox}&size=${window.innerWidth},${window.innerHeight}&f=image`}
      ></img>
    </div>
  );
}
