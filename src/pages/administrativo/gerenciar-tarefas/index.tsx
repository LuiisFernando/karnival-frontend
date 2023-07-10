import Head from "next/head";
import { GetServerSideProps } from 'next';

import { Role } from "@/types/User";
import { withSSRAuth } from "@/Utils/withAuth";

import { Container } from "@/styles/Grid";
import * as AdmStyled from '@/styles/pages/administrativo/DefaultLayout';
export default function GerenciarTarefas() {
    return (
        <>
            <Head>
                <title>Karnival: Gerenciamento de tarefas</title>
            </Head>
            <Container>
                <AdmStyled.AdministrativoContainer>
                    <h1>Tarefas</h1>
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