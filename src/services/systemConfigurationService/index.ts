import { ISystemConfiguration } from "@/types/SystemConfiguration";
import api from "../api";

export async function getSystemConfiguration() {
    return await api.get<ISystemConfiguration>('systemConfiguration/GetConfiguration/');
}