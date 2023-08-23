// googleMapConfig.ts

import { google } from 'google-maps';

export interface GoogleApiProps {
    map: google.maps.Map;
    maps: typeof google.maps;
}

export interface GeoJSONPolygon {
    type: string;
    features: {
        geometry: {
            type: 'Polygon';
            coordinates: [[[number, number]]];
        };
        properties: any;
    }[];
}

export const mapOptions = {
    disableDefaultUI: true,
    gestureHandling: 'greedy',
};
