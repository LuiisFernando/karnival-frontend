import api from "../api";
import { IPerson, IPersonCreate, IPersonEdit  } from "@/types/Person"

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
    return await api.get<IPersonEdit>(`person/GetPersonClient/${id}`);
}

export async function updatePerson(person: IPersonEdit) {
    return await api.put('person/UpdatePerson', person);
}

export async function getPersonProfessional(id: number) {
    return await api.get<IPersonEdit>(`person/GetPersonProfessional/${id}`);
}

export async function deletePerson(id: number) {
    return await api.delete(`person/DeletePerson/${id}`);
}

export async function activePerson(id: number) {
    return await api.put(`person/ActivePerson/${id}`);
}