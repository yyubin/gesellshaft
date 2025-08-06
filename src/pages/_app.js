import '@/styles/globals.css';
import { PrisonerProvider } from '@/context/PrisonerContext';

export default function App({ Component, pageProps }) {
    return (
        <PrisonerProvider>
            <Component {...pageProps} />
        </PrisonerProvider>
    );
}
