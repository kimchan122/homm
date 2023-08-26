import React from 'react';
import styles from './sideComponent2Style.css';

const SideComponent2 = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <div className='sideComponent2' style={{ position: 'fixed', left: '250px', top: 0, bottom: 0, width: '250px', backgroundColor: '#e7e7e7' }}>
            {children}
            <button className='closeButton' onClick={onClose}>x</button>
            SideComponent2
        </div>
    );
}

export default SideComponent2;