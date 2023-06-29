import React, { useState } from "react";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/locale/pt-br';
import moment from 'moment';

moment.locale("moment/locale/pt-br");
const localizer = momentLocalizer(moment);

export default function Agenda() {
  const [eventsData, setEventsData] = useState<any>([{ start: new Date(), end: new Date(), title: "special event" }]);

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
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
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

  return (
    <>
      <h1>Agenda</h1>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Calendar
          views={["day", "week", "month", "agenda"]}
          culture="pt-BR"
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ height: '50vh', width: '50%' }}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
          messages={defaultMessages}
        />
      </div>
    </>
  );
}