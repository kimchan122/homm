import React from 'react';
import { useRouter } from 'next/router';

function ENSPage() {
    const router = useRouter();
    const { ensName } = router.query;

    return (
        <div>
            <h1>ENS Practice</h1>
            <h3>ENS name: {ensName}</h3>
        </div>
    );
}

export default ENSPage;