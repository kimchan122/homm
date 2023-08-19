import React, { useState, useEffect, useRef } from 'react';
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
    const [drawnPolygons, setDrawnPolygons] = useState<google.maps.Polygon[]>([]);
    const [tooltip, setTooltip] = useState<{ content: string; position: { top: number; left: number; }; } | null>(null);

    const tooltipRef = useRef<HTMLDivElement | null>(null);


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
        fetch('/geojson/TPHCM_subarea.geojson')
            .then(response => response.json())
            .then(data => setGeoData(data));
    }, []);

    useEffect(() => {
        if (mapApi && mapInstance && geoData) {

            drawnPolygons.forEach(polygon => polygon.setMap(null));

            const newDrawnPolygons: google.maps.Polygon[] = [];

            geoData.features.forEach(feature => {
                feature.geometry.coordinates.forEach(polygonCoords => {
                    const formattedCoords = polygonCoords[0].map(coord => ({ lat: coord[1], lng: coord[0] }));
                    const polygon = new mapApi.Polygon({
                        paths: formattedCoords,
                        fillColor: '#FF0000',
                        fillOpacity: 0.2,
                        strokeColor: '#FF0000',
                        strokeWeight: 1,
                    });
                    polygon.setMap(mapInstance);
                    newDrawnPolygons.push(polygon);
                    polygon.addListener('mouseover', (e) => {
                        const point = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                        const worldPoint = mapInstance.getProjection().fromLatLngToPoint(point);
                    });

                    polygon.addListener('mousemove', (e) => {
                        if (tooltipRef.current) {
                            tooltipRef.current.style.top = `${e.domEvent.clientY + 35}px`;
                            tooltipRef.current.style.left = `${e.domEvent.clientX + 5}px`;
                            tooltipRef.current.textContent = feature.properties.VARNAME_2;
                            tooltipRef.current.style.backgroundColor = 'white';
                            tooltipRef.current.style.border = '1px solid black';
                            tooltipRef.current.style.display = 'flex';
                            tooltipRef.current.style.alignItems = 'center';
                            tooltipRef.current.style.color = 'black';
                            tooltipRef.current.style.padding = '5px 10px 5px 10px';
                            tooltipRef.current.style.borderRadius = '5px';
                            tooltipRef.current.style.border = 'none';
                            tooltipRef.current.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
                        }
                    });

                    polygon.addListener('mouseout', () => {
                        if (tooltipRef.current) {
                            tooltipRef.current.style.display = 'none';
                        }
                    });
                });
            });

            setDrawnPolygons(newDrawnPolygons);
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
            />
            <div className={styles.customControls}>
                <button onClick={handleZoomIn}><FontAwesomeIcon icon={faPlus} /></button>
                <hr />
                <button onClick={handleZoomOut}><FontAwesomeIcon icon={faMinus} /></button>
            </div>
            <div ref={tooltipRef} className="tooltip" style={{ position: 'absolute', display: 'none', height: '30px', zIndex: 100, overflow: 'hidden' }} />
        </div>
    );
};

export default GoogleMapComponent;
