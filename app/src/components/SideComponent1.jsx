import React from 'react';
import styles from './sideComponent1Style.css';
import { CrossSVG } from '@ensdomains/thorin';

const SideComponent1 = ({ isVisible, onClose, children }) => {

    if (!isVisible) return null;

    return (
        <div className='sideComponent1'>
            {children}
            <button className='closeButton' onClick={onClose}><CrossSVG /></button>
            SideComponent1
        </div >
    );
}

export default SideComponent1;