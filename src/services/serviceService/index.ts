import api from "../api";
import { IService, IServiceCreate } from "@/types/Service";


export async function createService(service: IServiceCreate) {
    return api.post("service/CreateService", service);
}

export async function getServices() {
  return await api.get<IService[]>("service/GetServices");
}
