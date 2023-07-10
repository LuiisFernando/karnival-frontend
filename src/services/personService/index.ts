import api from "../api";
import { IPerson, IPersonCreate  } from "@/types/Person"

export async function getProfessionalsService() {
    return await api.get<IPerson[]>('person/GetProfissionals');
}

export async function getClientService() {
    return await api.get<IPerson[]>('person/GetClients');
}

export async function createPersonProfessional(person: IPersonCreate) {
    person.provider = true;
    return await api.post('person/CreatePerson', person);
}

export async function createPersonClient(person: IPersonCreate) {
    person.provider = false;
    return await api.post('person/CreatePerson', person);
} 

export async function getPersonClient(id: number) {
    return await api.get<IPerson>(`person/GetPersonClient/${id}`);
}

export async function updatePersonClient(person: IPerson) {
    return await api.put('person/updatePersonClient', person);
}