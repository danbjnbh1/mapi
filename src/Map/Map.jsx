import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Map.module.scss';
import JSITM from 'js-itm'

export default function Map(props) {
  const [layersSource, setLayersSource] = useState([]);
  const [bbox, setBbox] = useState();
  function handleApiLoaded(map, maps) {
    console.log(JSITM);
    maps.event.addListener(map, 'bounds_changed', () => {
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
      console.log(props.checkedLayers);
      props.checkedLayers.forEach((layerId) => {
        newLayersSource.push(
          `{"source":{"type":"mapLayer","mapLayerId":${layerId}},"minScale":501000,'maxScale':0}`
        );
      });
      console.log(String(newLayersSource));
      return newLayersSource.toString();
    });
  }, [props.checkedLayers]);

  const defaultProps = {
    center: { lat: 32, lng: 35 },
    zoom: 8,
  };

  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBGnXCINSRElxDs-0zKXbE0PUkqaObC48Y' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      ></GoogleMapReact>
      <img
        className={styles.layerImg}
        alt="layerImage"
        src={`https://ags.govmap.gov.il/proxy/proxy.ashx?http://govmap/arcgis/rest/services/AdditionalData/MapServer/export?dynamicLayers=[${layersSource}]&dpi=96&transparent=true&format=png32&&bbox=${bbox}&size=${window.innerWidth},${window.innerHeight}&f=image`}
      ></img>
    </div>
  );
}
