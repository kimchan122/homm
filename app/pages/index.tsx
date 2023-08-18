import React from 'react';
// import Head from 'next/head';
// import Link fro/m 'next/link';
import GoogleMapComponent from '../components/GoogleMap';

export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <header className="header">
                <h1>Header</h1>
            </header>
            <div className="flex-1 overflow-hidden">
                <GoogleMapComponent />
            </div>
            <footer className="footer">
                <p>Footer</p>
            </footer>
        </div>
    );
}
