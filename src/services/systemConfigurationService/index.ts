import { ISystemConfiguration } from "@/types/SystemConfiguration";
import api from "../api";
import { AxiosResponse } from "axios";

export async function getSystemConfiguration(): Promise<AxiosResponse<ISystemConfiguration>> {
    return await api.get<ISystemConfiguration>('systemConfiguration/GetConfiguration/');
}

export async function updateSystemConfiguration(data: ISystemConfiguration): Promise<AxiosResponse<boolean>> {
    return await api.put<boolean>('systemConfiguration/UpdateSystemConfiguration', data);
}