import { useState, useEffect } from "react";
import { Calendar, DateHeaderProps, HeaderProps, Messages, NavigateAction, dateFnsLocalizer } from 'react-big-calendar';
import {
    format,
    parse,
    startOfWeek,
    getDay,
    getMonth,
    getYear
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { toast } from "react-toastify";

import { ScheduleEvent } from "@/types/ScheduleEvent";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from "@/Utils/Messages.string";

import { useAuth } from "@/hooks/useAuth";

import { getProfessionalSchedule } from "@/services/professionalScheduleService";

const locales = {
    'pt-BR': ptBR,
};

const localizerFns = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface CalendarProps {

}

type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

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


export default function CalendarComponent({ }: CalendarProps) {
    const today = new Date();
    const currentMonth = getMonth(today) + 1;
    const currentYear = getYear(today);

    const [defaultDate, setDefaultDate] = useState<Date>(today);
    const [view, setView] = useState<View>();
    const [eventsData, setEventsData] = useState<ScheduleEvent[] | undefined>(undefined); // eventos

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [scheduleEventMaxHour, setScheduleEventMaxHour] = useState<Date | undefined>(undefined);
    const [scheduleEventMinHour, setScheduleEventMinHour] = useState<Date | undefined>(undefined);

    const { systemConfiguration } = useAuth();

    async function loadProfessionalSchedule(initialDate: string) {
        try {
            let eventArr: ScheduleEvent[] = [];
            const response = await getProfessionalSchedule(initialDate);

            if (response && response.data) {
                response.data.forEach(event => {
                    const dateSplited = event.date.split('/');

                    const year = Number(dateSplited[2]);
                    const month = Number(dateSplited[1]) - 1;
                    const day = Number(dateSplited[0]);

                    const initialHour = Number(event.initialHour.split(':')[0]);
                    const finalHour = Number(event.finalHour.split(':')[0]);

                    const initialDateEvent = new Date(year, month, day, initialHour, 0);
                    const finalDateEvent = new Date(year, month, day, finalHour, 0);

                    eventArr.push({ start: initialDateEvent, end: finalDateEvent, title: `${event.professionalName} - ${event.serviceName}`, paid: event.paid });
                });
            }
            console.log(eventArr);
            setEventsData(eventArr);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }
    
    function eventPropGetter(event: ScheduleEvent) {
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

    useEffect(() => {
        loadProfessionalSchedule(`${selectedYear}-${selectedMonth}-01`);
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        if (systemConfiguration) {
            const initialHour = systemConfiguration.openings[0].initialHour.split(':')[0];
            const finalHour = systemConfiguration.openings[0].finalHour.split(':')[0];

            setScheduleEventMaxHour(new Date(0, 0, 0, Number(finalHour), 0, 0));
            setScheduleEventMinHour(new Date(0, 0, 0, Number(initialHour), 0, 0));
        }
    }, [systemConfiguration]);

    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
            <Calendar
                popup
                localizer={localizerFns}
                defaultView={'month'}
                view={view}
                max={scheduleEventMaxHour}
                min={scheduleEventMinHour}
                step={30}
                views={["month", "week", "day"]}
                culture="pt-BR"
                defaultDate={defaultDate}
                date={defaultDate}
                events={eventsData}
                style={{ height: '700px', width: '100%' }}
                onSelectEvent={(event) => alert(event.title)}
                messages={defaultMessages}
                eventPropGetter={eventPropGetter}
                dayLayoutAlgorithm={"no-overlap"}
                onNavigate={(date: Date, view: View, action: NavigateAction) => {
                    const month = getMonth(date) + 1; // por default starta em 0
                    const year = getYear(date);
                    if (month !== selectedMonth) {
                        setSelectedMonth(month);
                    }

                    if (year !== selectedYear) {
                        setSelectedYear(year);
                    }

                    setDefaultDate(date);
                }}
            />
        </div>
    );
}