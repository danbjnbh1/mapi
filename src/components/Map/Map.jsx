import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './Map.module.scss';
import JSITM from 'js-itm';

const Map = (props) => {
  const [layersSource, setLayersSource] = useState([]);
  const [bbox, setBbox] = useState();
  const [layerLoaded, setLayerLoaded] = useState(false);

  const convertBounds = (bounds) => {
    //convert bounds coordinates from WGS to ITM
    const { mc, Eb } = bounds;
    let firstBound = mc.i + ' ' + Eb.i;
    let secondBound = mc.g + ' ' + Eb.g;

    let bbox =
      JSITM.gpsRef2itmRef(firstBound) + ' ' + JSITM.gpsRef2itmRef(secondBound);
    bbox = bbox.replaceAll(' ', ',');
    return bbox;
  };

  const handleApiLoaded = (map, maps) => {
    setBbox(convertBounds(map.getBounds()));

    maps.event.addListener(map, 'bounds_changed', () => {
      setLayerLoaded(false);
      setBbox(convertBounds(map.getBounds()));
    });
  };

  useEffect(() => {
    setLayersSource(() => {
      const newLayersSource = [];
      props.checkedLayers.forEach((layerId) => {
        newLayersSource.push(
          `{"source":{"type":"mapLayer","mapLayerId":${layerId}},"drawingInfo":{"transparency":${props.transparency}}}`
        );
      });
      return newLayersSource.toString();
    });
  }, [props.checkedLayers, props.transparency]);

  const defaultProps = {
    center: { lat: 31.5, lng: 35.5 },
    zoom: 8,
  };

  const creatMapOptions = () => {
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
  };

  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={creatMapOptions}
      ></GoogleMapReact>
      <img
        className={styles.layerImg}
        alt="layerImage"
        //if loading src = ""
        style={{ visibility: layerLoaded ? 'visible' : 'hidden' }}
        onLoad={() => setLayerLoaded(true)}
        src={`https://ags.govmap.gov.il/proxy/proxy.ashx?http://govmap/arcgis/rest/services/AdditionalData/MapServer/export?dynamicLayers=[${layersSource}]&dpi=96&transparent=true&format=png32&&bbox=${bbox}&size=${window.innerWidth},${window.innerHeight}&f=image`}
      ></img>
    </div>
  );
};

export default Map;
