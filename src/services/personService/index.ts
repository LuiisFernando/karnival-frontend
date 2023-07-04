import api from "../api";
import { IPerson, IPersonProfessionalCreate } from "@/types/Person"

export async function getProfessionalsService() {
    return await api.get<IPerson[]>('person/GetProfissionals');
}

export async function createPersonProfessional(person: IPersonProfessionalCreate) {
    person.provider = true;
    return await api.post('person/CreatePerson', person);
}