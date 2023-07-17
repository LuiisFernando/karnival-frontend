import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from "next/link";
import { toast } from 'react-toastify';

import { Role } from '@/types/User';
import { IPerson } from '@/types/Person';

import { withSSRAuth } from "@/Utils/withAuth";
import { formatCellphoneToMask } from '@/Utils/Functions';
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from '@/Utils/Messages.string';
import { getClientService } from '@/services/personService';

import { Container } from "@/styles/Grid";

import * as StyledFilter from '@/styles/shared/filterStyle';
import * as AdmStyled from '@/styles/pages/administrativo/DefaultLayout';

export default function Clientes() {
    const [clients, setClients] = useState<IPerson[]>([]);

    const route = useRouter();

    async function getProfessionals() {
        try {
            const response = await getClientService();
            setClients(response.data);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        getProfessionals();
    }, []);

    function edit(id: number) {
        route.push(`/administrativo/clientes/editar?id=${id}`);
    }

    return (
        <>
            <Head>
                <title>Karnival: Clientes</title>
            </Head>
            <Container>
                <AdmStyled.AdministrativoContainer>
                    <h1>Clientes</h1>

                    <StyledFilter.FilterContainer>
                        <input type="text" name="filter" placeholder="Filtre por Nome ou E-mail" />

                        <Link href="/administrativo/clientes/cadastro">Cadastrar</Link>
                    </StyledFilter.FilterContainer>

                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients?.map((pro: IPerson, index: any) => (
                                <tr key={index} onClick={() => edit(pro.id)}>
                                    <td>{pro.name}</td>
                                    <td>{pro.email}</td>
                                    <td>{pro.cellphone ? formatCellphoneToMask(pro.cellphone) : "SEM CELULAR"}</td>
                                    <td className={pro.active ? 'active' : 'deleted'}>{pro.active ? "Ativo" : "Excluído"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </AdmStyled.AdministrativoContainer>
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx: any) => {
    return {
        props: {
        }
    }
}, Role.Administrador);