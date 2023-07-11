import { useEffect } from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { getDay, format, getISODay, parseISO } from 'date-fns';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { AuthProvider } from '@/hooks/useAuth';

import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import GlobalStyles from '@/styles/Global';

interface AppTypeProps extends AppProps {
  functionTime: any[];
};

function App({ Component, pageProps, functionTime }: AppTypeProps) {

  useEffect(() => {

    // Obtenha o nome do dia da semana a partir do índice
    function obterNomeDiaSemana(indice: number) {
      const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

      return diasSemana[indice];
    }


    if (functionTime) {
      console.log(obterNomeDiaSemana(0));
    }
  }, [])

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

App.getInitialProps = async (ctx: NextPageContext) => {
  return {
    functionTime: [
      { day: 0, hourInitial: 9, finalHour: 22 },
      { day: 1, hourInitial: 9, finalHour: 22 },
      { day: 2, hourInitial: 9, finalHour: 22 },
      { day: 3, hourInitial: 9, finalHour: 22 },
      { day: 4, hourInitial: 9, finalHour: 22 },
      { day: 5, hourInitial: 9, finalHour: 22 },
      { day: 6, hourInitial: 9, finalHour: 22 }
    ]
  }
}

export default App;