import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from "next/head";
import Link from "next/link";
import { toast } from 'react-toastify';

import { IPerson } from '@/types/Person';
import { withSSRAuth } from "@/Utils/withAuth";
import { formatCellphoneToMask } from '@/Utils/Functions';
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from '@/Utils/ErrorMessage.string';
import { getClientService } from '@/services/personService';

import { Container } from "@/styles/Grid";

import * as Styled from "@/styles/pages/administrativo/profissionais/styles";

export default function Clientes() {
    const [clients, setClients] = useState<IPerson[]>([]);

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

    return (
        <>
            <Head>
                <title>Karnival: Clientes</title>
            </Head>
            <Container>
                <h1>Clientes</h1>

                <Styled.FilterContainer>
                    <input type="text" name="filter" placeholder="Filtre por Nome ou E-mail" />

                    <Link href="/administrativo/clientes/cadastro">Cadastrar</Link>
                </Styled.FilterContainer>

                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Celular</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients?.map((pro: IPerson, index: any) => (
                            <tr key={index}>
                                <td>{pro.name}</td>
                                <td>{pro.email}</td>
                                <td>{pro.cellphone ? formatCellphoneToMask(pro.cellphone) : ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx: any) => {
    return {
        props: {
        }
    }
}, true);