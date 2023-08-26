import React from 'react';
import styles from './SideComponent2.module.css';

interface SideComponent2Props {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const SideComponent2 = ({ isVisible, onClose, children }: SideComponent2Props) => {
    if (!isVisible) return null;

    return (
        <div className={styles.sideComponent2} style={{ position: 'fixed', left: '250px', top: 0, bottom: 0, width: '250px', backgroundColor: '#e7e7e7' }}>
            {children}
            <button className={styles.closeButton} onClick={onClose}>x</button>
            SideComponent2
        </div>
    );
}

export default SideComponent2;
