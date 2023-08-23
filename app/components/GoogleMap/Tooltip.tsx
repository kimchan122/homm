// Tooltip.tsx

import React, { useRef } from 'react';

const Tooltip = () => {
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    //other codes

    return (
        <div ref={tooltipRef} className="tooltip" style={{ position: 'absolute', display: 'none', height: '30px', zIndex: 100, overflow: 'hidden' }} />
    );
};

export default Tooltip;
