import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from "next/head";
import Link from "next/link";

import { IPerson } from '@/types/Person';
import { withSSRAuth } from "@/Utils/withAuth";
import { formatCellphoneToMask } from '@/Utils/Functions';
import { getProfessionalsService } from '@/services/personService';

import { Container } from "@/styles/Grid";

import * as Styled from "@/styles/pages/administrativo/profissionais/styles";

export default function Profissionais() {
    const [professionals, setProfessionals] = useState<IPerson[]>([]);

    async function getProfessionals() {
        const response = await getProfessionalsService();
        setProfessionals(response.data);
    }

    useEffect(() => {
        getProfessionals();
    }, []); 

    return (
        <>
            <Head>
                <title>Karnival: Profissionais</title>
            </Head>
            <Container>
                <h1>Profissionais</h1>

                <Styled.FilterContainer>
                    <input type="text" name="filter" placeholder="Filtre por Nome ou E-mail" />

                    <Link href="/administrativo/profissionais/cadastro">Cadastrar</Link>
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
                        {professionals?.map((pro: IPerson, index: any) => (
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