import { ScheduleEvent } from "@/types/ScheduleEvent";

export interface IScheduleModalProps {
    active: boolean;
    closeModal: () => void;
    event: ScheduleEvent | null;
}