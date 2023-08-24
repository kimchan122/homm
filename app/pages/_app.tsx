import { AppProps } from 'next/app';
import '../styles/css/globals.css';
import '../styles/css/satoshi.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
