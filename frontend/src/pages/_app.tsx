import './_global-styles.css';
import '@ocean-network-express/om-ui/styles/css/main.css';
import '@ocean-network-express/magenta-react/index.css';
// import { OmSessionProvider } from '@ocean-network-express/om-next-server/react';
// import { OmLayout } from '@ocean-network-express/om-ui';
import type { AppProps } from 'next/app';

export default function App({
    Component,
    pageProps: { /*session,*/ ...pageProps }
}: AppProps) {
    return (
        // <OmSessionProvider session={session} basePath="/chorus/api/auth">
        // <OmLayout>
        <Component {...pageProps} />
        // </OmLayout>
        // </OmSessionProvider>
    );
}
