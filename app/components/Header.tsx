import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { Toggle } from '@ensdomains/thorin'

interface HeaderProps {
    isToggleOn: boolean;
    onToggle: () => void;
    currentLevel: 'main' | 'subarea' | 'subsubarea';
}

const Header = ({ isToggleOn, onToggle, currentLevel }: HeaderProps) => {

    const getButtonColorClass = () => {
        if (currentLevel === 'subsubarea' && isToggleOn === true) {
            return styles.editModeHeader;
        }
        else {
            return styles.Header;
        }
    };

    useEffect(() => {
        console.log(isToggleOn);
    }, [isToggleOn])

    return (
        <header className={getButtonColorClass()}>
            <h1>HOMM logo(plan)</h1>
            {(currentLevel === 'subsubarea') ?
                <div className={styles.toggleSwitch}>
                    <Toggle size="small" onChange={() => onToggle()} />
                    {/* State: <p>{isToggleOn ? "TRUE-NORMAL" : "FALSE-EDITOR"}</p> */}
                </div>
                : null}
        </header>
    );
}

export default Header;