import React from 'react';

interface SideComponent2Props {
    isVisible: boolean;
    children?: React.ReactNode;
}

const SideComponent2: React.FC<SideComponent2Props> = ({ isVisible, children }) => {
    if (!isVisible) return null;

    return (
        <div style={{ position: 'fixed', left: '250px', top: 0, bottom: 0, width: '250px', backgroundColor: '#e7e7e7' }}>
            {children}
        </div>
    );
}

export default SideComponent2;
