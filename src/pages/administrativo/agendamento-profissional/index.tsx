import Head  from 'next/head';
import { GetServerSideProps } from 'next';

import { Role } from '@/types/User';
import { withSSRAuth } from "@/Utils/withAuth";

import { Container } from "@/styles/Grid";

export default function AgendamentoProfissional() {
    return (
        <>
            <Head>
                <title>Karnival: Agendamento profissionais</title>
            </Head>
            <Container>
                <h1>agendamento profissional</h1>
                
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
