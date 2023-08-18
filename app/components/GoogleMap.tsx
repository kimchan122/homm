import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './GoogleMap.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface GoogleApiProps {
    map: google.maps.Map;
    maps: typeof google.maps;
}

interface GeoJSONPolygon {
    type: string;
    features: {
        geometry: {
            type: 'Polygon';
            coordinates: [[[number, number]]];
        };
        properties: any;
    }[];
}


const center = {
    lat: 10.7552928,
    lng: 106.6416093,
};

const GoogleMapComponent = () => {

    const [zoomLevel, setZoomLevel] = useState(10);
    const [geoData, setGeoData] = useState<GeoJSONPolygon | null>(null);
    const [mapApi, setMapApi] = useState<typeof google.maps | null>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

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

    const handleApiLoaded = (props: GoogleApiProps) => {
        const { map, maps } = props;
        setMapApi(maps);
        setMapInstance(map);
    };


    useEffect(() => {
        fetch('/geojson/gadm41_VNM_2.json')
            .then(response => response.json())
            .then(data => setGeoData(data));
    }, []);

    useEffect(() => {
        if (mapApi && mapInstance && geoData) {
            geoData.features.forEach(feature => {
                if (feature.geometry.type === 'Polygon') {
                    const polygon = new mapApi.Polygon({
                        paths: feature.geometry.coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] })),
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        strokeColor: '#FF0000',
                        strokeWeight: 2,
                    });
                    polygon.setMap(mapInstance);
                }
            });
        }
    }, [mapApi, mapInstance, geoData]);

    return (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API }}
                options={mapOptions}
                defaultCenter={center}
                defaultZoom={10}
                zoom={zoomLevel}
                onGoogleApiLoaded={handleApiLoaded}
                yesIWantToUseGoogleMapApiInternals
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
