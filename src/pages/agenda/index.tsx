import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Calendar, DateHeaderProps, HeaderProps, Messages, NavigateAction, dateFnsLocalizer } from 'react-big-calendar';
import {
  format,
  parse,
  startOfWeek,
  getDay,
  getMonth,
  getHours
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Container } from "@/styles/Grid";

const locales = {
  'pt-BR': ptBR,
}

const localizerFns = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';


export default function Agenda() {
  const today = new Date();
  const currentMonth = getMonth(today) + 1;

  const [defaultDate, setDefaultDate] = useState<Date>(today);
  const [view, setView] = useState<View>();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const dataInicial1 = new Date(2023, 5, 29, 13, 0);
  const dataFim1 = new Date(2023, 5, 29, 13, 30);

  const dataInicial12 = new Date(2023, 5, 29, 14, 30);
  const dataFim2 = new Date(2023, 5, 29, 19, 0, 0);

  const dia27Ini = new Date(2023, 5, 27, 18, 0);
  const dia27Fim = new Date(2023, 5, 27, 19, 0);


  const minDate = new Date(0, 0, 0, 9, 0, 0); // horario de entrada
  const maxDate = new Date(0, 0, 0, 20, 0, 0); // horario de saida

  const eventos = [
    { start: dataInicial1, end: dataFim1, title: "reservado", paid: true },
    { start: dataInicial1, end: dataFim1, title: "reservado", paid: false },
    { start: dataInicial1, end: dataFim1, title: "reservado", paid: false },
    { start: dataInicial1, end: dataFim1, title: "reservado", paid: true },
    { start: dataInicial12, end: dataFim2, title: "reservado", paid: true },
    { start: dataInicial12, end: dataFim2, title: "reservado2", paid: false },
    { start: dataInicial12, end: dataFim2, title: "reservado3", paid: true },
    { start: dataInicial12, end: dataFim2, title: "reservado3", paid: true },
    { start: dia27Ini, end: dia27Fim, title: "reservado", paid: true }
  ];

  const [eventsData, setEventsData] = useState<any>(eventos);

  const defaultMessages: Messages = {
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Dia Todo',
    week: 'Semana',
    // work_week: 'Work Week',
    day: 'Dia',
    month: 'Mês',
    previous: 'Voltar',
    next: 'Avançar',
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    today: 'Hoje',
    agenda: 'Agenda',
    // noEventsInRange: 'There are no events in this range.',
    showMore: function showMore(total: number) {
      return "+" + total + " eventos";
    },
  };

  const handleSelect = ({ start, end }: any) => {
    const selectedHour = getHours(start);
    const minHourAvailable = getHours(minDate);

    const isSunday = getDay(start) === 0;

    const hourSelecteIsLessThanMinHour = selectedHour < minHourAvailable;

    if (hourSelecteIsLessThanMinHour)
      return;

    if (isSunday)
      return;

    const title = window.prompt("New Event name " + start);
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title
        }
      ]);
  };

  function eventPropGetter(event: any, start: any, end: any, isSelected: any) {
    var style = {
      backgroundColor: event.paid ? 'green' : 'red',
      borderRadius: '5px',
      opacity: 0.4,
      color: '#FFF',
      border: '0px',
    };
    return {
      style: style
    };
  }

  const customDayPropGetter = (date: Date) => {
    const isSaturday = getDay(date) === 6;
    const isSunday = getDay(date) === 0;

    return {
      style: {
        backgroundColor: isSunday ? 'rgba(181, 181, 181, 0.3)' : 'transparent'
      }
    };
  };

  const HeaderWeekContent: React.FC<any> = (props: HeaderProps) => {
    const { date, label } = props;

    // capitalize dia da semana
    const newLabel = label.split('-')[0].charAt(0).toUpperCase() + label.split('-')[0].slice(1);

    const dayOfWeek = date.getDay();

    const className = dayOfWeek === 0 || dayOfWeek === 6 ? 'classes.day_weekend' : 'classes.day_working';
    return (
      <span className={className}>
        {newLabel}
      </span>
    );
  };

  const DateCellContent: React.FC<any> = (props: DateHeaderProps) => {
    const { date } = props;
    const dayOfWeek = date.getDay();

    const className = dayOfWeek === 0 || dayOfWeek === 6 ? 'classes.day_weekend' : 'classes.day_working';
    return (
      <span className={className} style={{ cursor: 'pointer', display: 'block', width: '100%', height: '100%' }} onClick={() => {
        setView('day');
        setDefaultDate(date);
      }}>
        {props.label}
      </span>
    );
  };

  const WeekHeaderContent: React.FC<any> = (props: HeaderProps) => {
    const { label } = props;
    
    const newLabel = `${label.split(' ')[0]} ${label.split(' ')[1].charAt(0).toUpperCase()}${label.split(' ')[1].slice(1)}`;

    return (
      <span className="classes.day_working" style={{ fontWeight: '700' }}>{newLabel}</span>
    );
  };

  useEffect(() => {
    console.log('dispara a busca dos eventos do mês ', selectedMonth);
  }, [selectedMonth]);

  return (
    <>
      <Head>
        <title>Karnival: Agenda</title>
      </Head>
      <Container>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <Calendar
            popup
            localizer={localizerFns}
            defaultView={'week'}
            view={view}
            onView={setView}
            min={minDate}
            max={maxDate}
            step={30}
            views={["month", "week", "day"]}
            culture="pt-BR"
            selectable
            defaultDate={defaultDate}
            date={defaultDate}
            events={eventsData}
            style={{ height: '600px', width: '100%' }}
            onSelectEvent={(event) => alert(event.title)}
            onSelectSlot={handleSelect}
            messages={defaultMessages}
            eventPropGetter={eventPropGetter}
            dayLayoutAlgorithm={"no-overlap"}
            components={{
              month: {
                header: HeaderWeekContent,
                dateHeader: DateCellContent
              },
              week: {
                header: WeekHeaderContent
              },
            }}
            onNavigate={(date: Date, view: View, action: NavigateAction) => {
              const month = getMonth(date) + 1; // por default starta em 0

              if (month !== selectedMonth) {
                setSelectedMonth(month);
              }

              setDefaultDate(date);
            }}
            dayPropGetter={customDayPropGetter}
          />
        </div>
      </Container>
    </>
  );
}