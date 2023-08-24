import React from 'react';

interface SideComponent1Props {
    isVisible: boolean;
    children?: React.ReactNode;
}

const SideComponent1: React.FC<SideComponent1Props> = ({ isVisible, children }) => {
    if (!isVisible) return null;

    return (
        <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '250px', backgroundColor: '#f7f7f7' }}>
            {children}
            SideComponent1
        </div>
    );
}

export default SideComponent1;
