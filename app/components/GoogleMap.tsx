import React from 'react';
import GoogleMapReact from 'google-map-react';

const center = {
    lat: 10.7552928,
    lng: 106.6416093,
};

const GoogleMapComponent = () => {
    return (
        <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API }}
                defaultCenter={center}
                defaultZoom={10}
            >
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMapComponent;
