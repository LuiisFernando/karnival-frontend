import React, { useState } from "react";
import Head from "next/head";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';

import { Container } from "@/styles/Grid";

moment.locale("moment/locale/pt-br");

const localizer = momentLocalizer(moment);

type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';


export default function Agenda() {
  const [defaultDate, setDefaultDate] = useState<Date>();
  const [view, setView] = useState<View>();

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
    { start: dataInicial12, end: dataFim2, title: "reservado", paid: true },
    { start: dataInicial12, end: dataFim2, title: "reservado2", paid: false },
    { start: dataInicial12, end: dataFim2, title: "reservado3", paid: true },
    { start: dia27Ini, end: dia27Fim, title: "reservado", paid: true }
  ];

  const [eventsData, setEventsData] = useState<any>(eventos);

  const defaultMessages = {
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
    noEventsInRange: 'There are no events in this range.',
    showMore: function showMore(total: any) {
      return "+" + total + " more";
    }
  };

  const handleSelect = ({ start, end }: any) => {
    const isSunday = moment(start).day() === 0;
    const hourSelecteIsLessThanMinHour = moment(start).hour() < moment(minDate).hour();

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
    const _date = moment(date);
    const isSaturday = _date.day() === 6;
    const isSunday = _date.day() === 0;

    return {
      style: {
        backgroundColor: isSunday ? 'rgba(181, 181, 181, 0.3)' : 'transparent'
      }
    };
  };

  const HeaderWeekContent: React.FC<any> = (props: any) => {
    const { date } = props;

    const dayOfWeek = date.getDay();

    const className = dayOfWeek === 0 || dayOfWeek === 6 ? 'classes.day_weekend' : 'classes.day_working';
    return (
      <span className={className}>
        {props.label}
      </span>
    );
  };

  const DateCellContent: React.FC<any> = (props: any) => {
    const { date } = props;
    const dayOfWeek = date.getDay();

    const className = dayOfWeek === 0 || dayOfWeek === 6 ? 'classes.day_weekend' : 'classes.day_working';

    return (
      <span className={className} style={{ cursor: 'pointer', display: 'block' , width: '100%', height: '100%'}} onClick={() => {
        setView('day');
        setDefaultDate(date);
      }}>
        {props.label}
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Karnival: Agenda</title>
      </Head>
      <Container>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <Calendar
            popup
            defaultView={'week'}
            view={view}
            onView={setView}
            min={minDate}
            max={maxDate}
            step={30}
            views={["month", "week", "day"]}
            culture="pt-BR"
            selectable
            localizer={localizer}
            defaultDate={defaultDate}
            date={defaultDate}
            events={eventsData}
            style={{ height: '600px', width: '100%' }}
            onSelectEvent={(event) => alert(event.title)}
            onSelectSlot={handleSelect}
            messages={defaultMessages}
            eventPropGetter={eventPropGetter}
            components={{
              month: {
                header: HeaderWeekContent,
                dateHeader: DateCellContent
              }
            }}
            onNavigate={(date: Date) => {
              setDefaultDate(date);
            }}
            dayPropGetter={customDayPropGetter}
          />
        </div>
      </Container>
    </>
  );
}