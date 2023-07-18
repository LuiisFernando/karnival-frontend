import api from "../api";
import { ICreateProfessionalScheduleRequest, IProfessionalScheduleResponse } from "@/types/ProfessionalSchedule";

export async function createProfessionalSchedule(request: ICreateProfessionalScheduleRequest) {
    await api.post('ProfessionalSchedule/CreateProfessionalSchedule', request);
}

export async function getProfessionalSchedule(initialDate: string) {
    return await api.get<IProfessionalScheduleResponse[]>(`ProfessionalSchedule/GetProfessionalSchedule?date=${initialDate}`);
}