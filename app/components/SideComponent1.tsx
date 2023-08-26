import React from 'react';
import styles from './SideComponent1.module.css';
import { CrossSVG } from '@ensdomains/thorin';

interface SideComponent1Props {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const SideComponent1 = ({ isVisible, onClose, children }: SideComponent1Props) => {

    if (!isVisible) return null;

    return (
        <div className={styles.sideComponent1}>
            {children}
            <button className={styles.closeButton} onClick={onClose}><CrossSVG /></button>
            SideComponent1
        </div >
    );
}

export default SideComponent1;
