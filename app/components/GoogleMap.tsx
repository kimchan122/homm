import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './GoogleMap.module.css';
import { PlusSVG, MinusSVG } from '@ensdomains/thorin';
import SideComponent1 from './SideComponent1';
import SideComponent2 from './SideComponent2';

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

interface GoogleMapProps {
    currentLevel: 'main' | 'subarea' | 'subsubarea';
    setCurrentLevel: React.Dispatch<React.SetStateAction<'main' | 'subarea' | 'subsubarea'>>;
    isToggleOn: boolean;
}

const center = {
    lat: 10.7552928,
    lng: 106.6416093,
};

const tooltipStyles = {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    color: 'black',
    padding: '5px 10px 5px 10px',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    fontFamily: "Satoshi-Bold"
};

const GoogleMapComponent = ({ currentLevel, setCurrentLevel, isToggleOn }: GoogleMapProps) => {

    const currentLevelRef = useRef(currentLevel);
    const isToggleOnRef = useRef(isToggleOn);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const [zoomLevel, setZoomLevel] = useState(10);
    const [geoData, setGeoData] = useState<GeoJSONPolygon | null>(null);
    const [subGeoData, setSubGeoData] = useState<GeoJSONPolygon | null>(null);
    const [mapApi, setMapApi] = useState<typeof google.maps | null>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    const [drawnPolygons, setDrawnPolygons] = useState<google.maps.Polygon[]>([]);
    const [drawnSubareaPolygons, setDrawnSubareaPolygons] = useState<google.maps.Polygon[]>([]);
    const [isMainPolygonsVisible, setIsMainPolygonsVisible] = useState(true);
    const [lastSelectedMainAreaName, setLastSelectedMainAreaName] = useState<string | null>(null);
    const [lastSelectedSubAreaName, setLastSelectedSubAreaName] = useState<string | null>(null);
    const [showSideComponent1, setShowSideComponent1] = useState(false);
    const [showSideComponent2, setShowSideComponent2] = useState(false);

    const mapOptions = {
        disableDefaultUI: true,
        gestureHandling: 'greedy',
    };

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => prevZoom + 1);
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => prevZoom - 1);
    };

    const handleApiLoaded = (props: GoogleApiProps) => {
        const { map, maps } = props;
        setMapApi(maps);
        setMapInstance(map);
    };

    const handlePolygonClick = () => {
        console.log("polygon click event enter");
        if (currentLevel === 'subsubarea' && isToggleOn) {
            console.log("polygon click");
            setShowSideComponent1(true);
        }
    }

    // const handleMapClick = () => {
    //     console.log("mapclick");
    //     if (currentLevel === 'subsubarea' && isToggleOn) {
    //         setShowSideComponent1(true);
    //         // setShowSideComponent2(true);
    //     }
    // }

    // if (mapInstance) {
    //     mapInstance.addListener('click', (event) => {
    //         handleMapClick();
    //     });
    // }

    const drawSubareaPolygons = (districtName: string) => {
        if (!mapApi || !mapInstance || !subGeoData) return;

        clearSubareaPolygons();

        const filteredFeatures = subGeoData.features.filter(feature => {
            return feature.properties.NAME_2 === districtName;
        });

        const newDrawnSubareaPolygons: google.maps.Polygon[] = [];

        filteredFeatures.forEach(feature => {
            feature.geometry.coordinates.forEach(polygonCoords => {
                polygonCoords.forEach(singlePolygonCoords => {
                    const formattedCoords = singlePolygonCoords.map((coord: any) => ({ lat: coord[1], lng: coord[0] }));
                    const polygon = new mapApi.Polygon({
                        paths: formattedCoords,
                        fillColor: '#FF0000',
                        fillOpacity: 0.1,
                        strokeColor: '#FF0000',
                        strokeWeight: 1,
                    });
                    polygon.setMap(mapInstance);
                    newDrawnSubareaPolygons.push(polygon);

                    polygon.addListener('click', () => {
                        console.log("clickclick");
                        handleSubareaClick(feature);
                        const selectedVarName = feature.properties.VARNAME_3;
                        setLastSelectedSubAreaName(selectedVarName);
                    });

                    polygon.addListener('mousemove', (e) => {
                        if (tooltipRef.current) {
                            Object.assign(tooltipRef.current.style, tooltipStyles);
                            tooltipRef.current.style.top = `${e.domEvent.clientY + 30}px`;
                            tooltipRef.current.style.left = `${e.domEvent.clientX + 5}px`;
                            tooltipRef.current.textContent = feature.properties.VARNAME_3;
                        }
                    });

                    polygon.addListener('mouseout', () => {
                        polygon.setOptions({ fillOpacity: 0.1 });
                        if (tooltipRef.current) {
                            tooltipRef.current.style.display = 'none';
                        }
                    });

                    polygon.addListener('mouseover', (e) => {
                        polygon.setOptions({ fillOpacity: 0.3 });
                        const point = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                        mapInstance.getProjection().fromLatLngToPoint(point);
                    });
                });
            });
        });
        setDrawnSubareaPolygons(newDrawnSubareaPolygons);
    };

    const clearSubareaPolygons = () => {
        drawnSubareaPolygons.forEach(polygon => {
            polygon.setMap(null);
        });
        setDrawnSubareaPolygons(prevPolygons => {
            prevPolygons.forEach(polygon => {
                polygon.setMap(null);
            });
            return [];
        });
    };

    const handleSubareaClick = (feature: any) => {
        const bounds = new google.maps.LatLngBounds();
        feature.geometry.coordinates.forEach((multiPolygonCoords: any) => {
            multiPolygonCoords.forEach((polygonCoords: any) => {
                polygonCoords.forEach((coord: any) => {
                    const lat = coord[1];
                    const lng = coord[0];
                    bounds.extend({ lat: lat, lng: lng });
                });
            });
        });
        if (mapInstance) {
            mapInstance.fitBounds(bounds);
        }
        // mapInstance.fitBounds(bounds);

        setCurrentLevel('subsubarea');

        clearSubareaPolygons();
        drawSpecificSubarea(feature);
    }

    const drawSpecificSubarea = (feature: any) => {
        if (!mapApi || !mapInstance) return;

        const newDrawnSubareaPolygon: google.maps.Polygon[] = [];

        feature.geometry.coordinates.forEach((multiPolygonCoords: any) => {
            multiPolygonCoords.forEach((polygonCoords: any) => {
                const formattedCoords = polygonCoords.map((coord: any) => ({ lat: coord[1], lng: coord[0] }));
                const polygon = new mapApi.Polygon({
                    paths: formattedCoords,
                    fillColor: '#FF0000',
                    fillOpacity: 0.1,
                    strokeColor: '#FF0000',
                    strokeWeight: 1,
                });

                polygon.addListener('click', () => {
                    console.log("clickclickclick");
                    console.log(currentLevelRef.current);
                    console.log(isToggleOnRef.current);
                    if (currentLevelRef.current == 'subsubarea') {
                        console.log("now");
                    }
                    if (isToggleOnRef.current == true) {
                        console.log("TRUE");
                    }
                });

                polygon.setMap(mapInstance);
                newDrawnSubareaPolygon.push(polygon);
            });
        });

        setDrawnSubareaPolygons(newDrawnSubareaPolygon);
    }

    const handleMainButtonClick = () => {
        setCurrentLevel('main');
        setLastSelectedMainAreaName(null);
        setLastSelectedSubAreaName(null);
        setIsMainPolygonsVisible(true);
        clearSubareaPolygons();
        if (mapInstance) {
            mapInstance.setZoom(10);
            mapInstance.setCenter(center);
            fitMapToBounds(center);
        }
    }

    const handleMainAreaButtonClick = () => {
        setCurrentLevel('subarea');
        setLastSelectedSubAreaName(null);
        clearSubareaPolygons();

        if (lastSelectedMainAreaName && geoData) {
            const selectedMainAreaFeature = geoData.features.find(feature => feature.properties.VARNAME_2 === lastSelectedMainAreaName);
            if (selectedMainAreaFeature) {
                const correspondingName2 = selectedMainAreaFeature.properties.NAME_2;
                fitMapToBounds(selectedMainAreaFeature);
                drawSubareaPolygons(correspondingName2);
            }
        }
    };

    const fitMapToBounds = (feature: any) => {
        if (!feature.geometry || !feature.geometry.coordinates) {
            console.warn("Invalid feature geometry");
            return;
        }
        const bounds = new google.maps.LatLngBounds();
        feature.geometry.coordinates.forEach((multiPolygonCoords: any) => {
            multiPolygonCoords.forEach((polygonCoords: any) => {
                polygonCoords.forEach((coord: any) => {
                    const lat = coord[1];
                    const lng = coord[0];
                    bounds.extend({ lat: lat, lng: lng });
                });
            });
        });
        if (mapInstance) {
            mapInstance.fitBounds(bounds);
        }
    };

    const getButtonColorClass = (index: number) => {
        if (currentLevel === 'subarea') {
            if (index === 0) {
                return styles.subareaColor;
            }
            else if (index === 1) {
                return styles.defaultColor;
            }
        }
        else if (currentLevel === 'subsubarea') {
            if (index === 0) {
                return styles.subareaColor;
            }
            else if (index === 1) {
                return styles.subareaColor;
            }
        }
        else {
            return styles.defaultColor;
        }
    };

    useEffect(() => {
        console.log("currentlevel: " + currentLevel);
        currentLevelRef.current = currentLevel;
    }, [currentLevel]);

    useEffect(() => {
        console.log("toggle: " + isToggleOn);
        isToggleOnRef.current = isToggleOn;
    }, [isToggleOn]);

    useEffect(() => {
        fetch('/geojson/TPHCM_subarea.geojson')
            .then(response => response.json())
            .then(data => setGeoData(data));

        fetch('/geojson/TPHCM_subarea_subarea.geojson')
            .then(response => response.json())
            .then(data => setSubGeoData(data));
    }, []);

    useEffect(() => {
        if (mapApi && mapInstance && geoData) {

            drawnPolygons.forEach(polygon => polygon.setMap(null));

            const newDrawnPolygons: google.maps.Polygon[] = [];

            geoData.features.forEach(feature => {
                feature.geometry.coordinates.forEach(polygonCoords => {
                    const formattedCoords = polygonCoords[0].map((coord: any) => ({ lat: coord[1], lng: coord[0] }));
                    const polygon = new mapApi.Polygon({
                        paths: formattedCoords,
                        fillColor: '#FF0000',
                        fillOpacity: 0.1,
                        strokeColor: '#FF0000',
                        strokeWeight: 1,
                    });
                    if (isMainPolygonsVisible) {
                        polygon.setMap(mapInstance);
                    }
                    newDrawnPolygons.push(polygon);

                    polygon.addListener('click', (e) => {
                        setIsMainPolygonsVisible(false);
                        const bounds = new google.maps.LatLngBounds();

                        const selectedDistrictName = feature.properties.NAME_2;
                        const selectedVarName = feature.properties.VARNAME_2;

                        drawnPolygons.forEach(p => {
                            p.setOptions({ fillOpacity: 0, strokeOpacity: 0, clickable: false });
                        });

                        clearSubareaPolygons();
                        drawSubareaPolygons(selectedDistrictName);
                        setLastSelectedMainAreaName(selectedVarName);
                        setCurrentLevel('subarea');

                        polygon.getPath().forEach((point) => {
                            bounds.extend(point);
                        });
                        mapInstance.fitBounds(bounds);
                    });

                    polygon.addListener('mouseover', (e) => {
                        polygon.setOptions({ fillOpacity: 0.3 });
                        const point = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                        mapInstance.getProjection().fromLatLngToPoint(point);
                    });

                    polygon.addListener('mousemove', (e) => {
                        if (tooltipRef.current) {
                            Object.assign(tooltipRef.current.style, tooltipStyles);
                            tooltipRef.current.style.top = `${e.domEvent.clientY + 30}px`;
                            tooltipRef.current.style.left = `${e.domEvent.clientX + 5}px`;
                            tooltipRef.current.textContent = feature.properties.VARNAME_2;
                        }
                    });

                    polygon.addListener('mouseout', () => {
                        polygon.setOptions({ fillOpacity: 0.1 });
                        if (tooltipRef.current) {
                            tooltipRef.current.style.display = 'none';
                        }
                    });
                });
            });

            setDrawnPolygons(newDrawnPolygons);
        }
    }, [mapApi, mapInstance, geoData, isMainPolygonsVisible]);

    useEffect(() => {
        if (mapInstance) {
            google.maps.event.addListener(mapInstance, 'zoom_changed', () => {
                const currentZoom = mapInstance.getZoom();
                setZoomLevel(currentZoom);
            });
        }
        return () => {
            if (mapInstance) {
                google.maps.event.clearListeners(mapInstance, 'zoom_changed');
            }
        }
    }, [mapInstance]);

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
                <button onClick={handleZoomIn}><PlusSVG /></button>
                <hr />
                <button onClick={handleZoomOut}><MinusSVG /></button>
            </div>

            <div ref={tooltipRef} className="tooltip" style={{ position: 'absolute', display: 'none', height: '30px', zIndex: 100, overflow: 'hidden' }} />

            <div className={styles.levelControls}>
                <button className={`${styles.levelButton} ${getButtonColorClass(0)}`} onClick={handleMainButtonClick}>
                    Ho Chi Minh City
                </button>
                {(currentLevel === 'subarea' || currentLevel === 'subsubarea') && lastSelectedMainAreaName && (
                    <>
                        <p className={styles.levelDown}>＞</p>
                        <button className={`${styles.levelButton} ${getButtonColorClass(1)}`} onClick={handleMainAreaButtonClick}>
                            {lastSelectedMainAreaName}
                        </button>
                    </>
                )}
                {currentLevel === 'subsubarea' && lastSelectedSubAreaName && (
                    <>
                        <p className={styles.levelDown}>＞</p>
                        <button className={`${styles.levelButton} ${styles.defaultColor}`}>
                            {lastSelectedSubAreaName}
                        </button>
                    </>
                )}
            </div>
            {showSideComponent1 && <SideComponent1 isVisible={showSideComponent1} />}
            {showSideComponent2 && <SideComponent2 isVisible={showSideComponent2} />}
        </div>
    );
};

export default GoogleMapComponent;
