import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import GoogleMapReact from 'google-map-react';
import styles from './GoogleMap.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const center = {
    lat: 10.7552928,
    lng: 106.6416093,
};

const GoogleMapComponent = () => {

    const [zoomLevel, setZoomLevel] = useState(10);

    const mapOptions = {
        disableDefaultUI: true,
        gestureHandling: 'greedy',
    };

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => prevZoom + 0.1);
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => prevZoom - 0.1);
    };

    return (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API }}
                options={mapOptions}
                defaultCenter={center}
                defaultZoom={10}
                zoom={zoomLevel}
            >
            </GoogleMapReact>
            <div className={styles.customControls}>
                <button onClick={handleZoomIn}><FontAwesomeIcon icon={faPlus} /></button>
                <hr />
                <button onClick={handleZoomOut}><FontAwesomeIcon icon={faMinus} /></button>
            </div >
        </div >
    );
};

export default GoogleMapComponent;
