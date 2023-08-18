import React from 'react';
import Header from '../components/Header';
import GoogleMapComponent from '../components/GoogleMap';

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-1 overflow-hidden">
                <GoogleMapComponent />
            </div>
            {/* <footer className="footer">
                <p>Footer</p>
            </footer> */}
        </div>
    );
}
