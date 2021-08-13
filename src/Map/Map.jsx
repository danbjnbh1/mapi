import React from 'react'
import GoogleMapReact from 'google-map-react';
import styles from './Map.module.scss'

export default function Map() {

  const defaultProps = {
    center: {
      //israel
      lat: 31.75288116220384,
      lng: 35.073333872173855
    },
    zoom: 8
  };

  return (
    <div className={styles.map}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyBGnXCINSRElxDs-0zKXbE0PUkqaObC48Y" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
    </GoogleMapReact>
  </div>
  )
}
