import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';

import Header from '@/components/Header';
import { AuthProvider } from '@/hooks/useAuth';

import GlobalStyles from '@/styles/Global';

import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalStyles />
      <ToastContainer />
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
