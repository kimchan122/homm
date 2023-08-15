import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/ens">
        <p>ENS practice</p>
      </Link>
      <Link href="/spruceid">
        <p>SpruceID practice</p>
      </Link>
      <Link href="/union">
        <p>Union practice</p>
      </Link>
    </div>
  );
}

export default HomePage;