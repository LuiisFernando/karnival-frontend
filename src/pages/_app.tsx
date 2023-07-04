import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { AuthProvider } from '@/hooks/useAuth';

import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import GlobalStyles from '@/styles/Global';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalStyles />
      <ToastContainer />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  );
}
