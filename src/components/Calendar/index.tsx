import { useState, useEffect, use } from "react";
import { Calendar, DateHeaderProps, HeaderProps, Messages, NavigateAction, ViewsProps, dateFnsLocalizer } from 'react-big-calendar';
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
import { View } from "./types";

import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from "@/Utils/Messages.string";

import { useAuth } from "@/hooks/useAuth";

import ScheduleModal from "../ScheduleModal";

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
    views: View[];
}

const defaultMessages: Messages = {
    date: 'Data',
    time: 'Hora',
    event: 'Agendamento',
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
        return "+" + total + " agendamentos";
    },
};

export default function CalendarComponent({ views }: CalendarProps) {
    const today = new Date();
    const currentMonth = getMonth(today) + 1;
    const currentYear = getYear(today);

    const [defaultViews, setDefaultViews] = useState<ViewsProps<ScheduleEvent | object> | undefined>(undefined);

    const [defaultDate, setDefaultDate] = useState<Date>(today);

    const [eventsData, setEventsData] = useState<ScheduleEvent[] | undefined>(undefined); // eventos

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [scheduleEventMaxHour, setScheduleEventMaxHour] = useState<Date | undefined>(undefined);
    const [scheduleEventMinHour, setScheduleEventMinHour] = useState<Date | undefined>(undefined);

    const { systemConfiguration } = useAuth();

    const [activeModalEvent, setActiveModalEvent] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

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

                    eventArr.push({ 
                        start: initialDateEvent, 
                        end: finalDateEvent, 
                        title: `${event.professionalName} - ${event.serviceName}`,
                        paid: event.paid,
                        date: event.date,
                        serviceName: event.serviceName
                    });
                });
            }
            console.log(response.data);
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

    useEffect(() => {
        setDefaultViews(views);
    }, [views])

    return (
        <>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                <Calendar
                    popup
                    localizer={localizerFns}
                    defaultView={'month'}
                    // view={view}
                    max={scheduleEventMaxHour}
                    min={scheduleEventMinHour}
                    step={30}
                    // views={["month", "week", "day"]}
                    views={defaultViews}
                    culture="pt-BR"
                    defaultDate={defaultDate}
                    date={defaultDate}
                    events={eventsData}
                    style={{ height: '700px', width: '100%' }}
                    onSelectEvent={(event) => {
                        // alert(event.title)
                        setSelectedEvent(event);
                        setActiveModalEvent(true);
                    }}
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
            <ScheduleModal active={activeModalEvent} closeModal={() => setActiveModalEvent(false)} event={selectedEvent} />
        </>
    );
}