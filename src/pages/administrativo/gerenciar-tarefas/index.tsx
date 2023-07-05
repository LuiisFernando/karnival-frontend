import Head from "next/head";
import { GetServerSideProps } from 'next';

import { Role } from "@/types/User";
import { withSSRAuth } from "@/Utils/withAuth";

import { Container } from "@/styles/Grid";

export default function GerenciarTarefas() {
    return (
        <>
            <Head>
                <title>Karnival: Gerenciamento de tarefas</title>
            </Head>
            <Container>
                <p>teste</p>
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