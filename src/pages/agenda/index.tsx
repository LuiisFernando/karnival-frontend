import React, { useState } from "react";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/locale/pt-br';
import moment from 'moment';

moment.locale("moment/locale/pt-br");

const localizer = momentLocalizer(moment);

const HeaderCellContent: React.FC<any> = (props: any) => {
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
    <span className={className}>
      {props.label}
    </span>
  );
};

export default function Agenda() {

  // let dataInicial = moment(new Date("2023-06-31"));
  // let datafim = moment(new Date("2023-06-31"));

  // console.log(dataInicial);

  
  const dataInicial1 = new Date(2023, 5, 29, 13, 0);
  const dataFim1 = new Date(2023, 5, 29, 13, 30);

  const dataInicial12 = new Date(2023, 5, 29, 13, 30);
  const dataFim2 = new Date(2023, 5, 29, 14, 0, 0);


  const eventos = [
    { start: dataInicial1, end: dataFim1, title: "evento 1", teste: '123' },
    { start: dataInicial12, end: dataFim2, title: "evento 2", teste: '321' }
  ]

  const [eventsData, setEventsData] = useState<any>(eventos);

  var defaultMessages = {
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
    // console.log('evento >> ', event);
    // var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: 'red',
        borderRadius: '5px',
        // opacity: 0.8,
        color: '#FFF',
        border: '0px',
    };
    return {
        style: style
    };
  }

  const customDayPropGetter = (date: Date) => {
    if (date.getDate() === 7 || date.getDate() === 6)
      return {
        className: 'special-day',
        style: {
          border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
          backgroundColor: 'red'
        },
      };
    else return {};
  };

  return (
    <>
      <h1>Agenda</h1>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Calendar
          popup
          min={new Date(0, 0, 0, 9, 0, 0)}
          max={new Date(0, 0, 0, 20, 0, 0)}
          step={30}
          views={["day", "week", "month", "agenda"]}
          culture="pt-BR"
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={eventsData}
          style={{ height: '600px', width: '90%' }}
          onSelectEvent={(event) => alert(event.teste)}
          onSelectSlot={(e) => {
            console.log(e);
            handleSelect(e);
          }}
          messages={defaultMessages}
          eventPropGetter={eventPropGetter}
          components={{
            month: {
              header: HeaderCellContent,
              dateHeader: DateCellContent
            }
          }}
          dayPropGetter={customDayPropGetter}
        />
      </div>
    </>
  );
}