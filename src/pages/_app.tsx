import type { AppProps } from 'next/app'
import Header from '@/components/Header';

import GlobalStyles from '@/styles/Global';
import { AuthProvider } from '@/hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
