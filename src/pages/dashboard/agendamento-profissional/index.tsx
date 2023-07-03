import { GetServerSideProps } from 'next';

import { withSSRAuth } from "@/Utils/withAuth";

import { Container } from "@/styles/Grid";

export default function AgendamentoProfissional() {
    return (
        <Container>
            <h1>agendamento profissional</h1>
            
        </Container>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx: any) => {
    return {
        props: {
        }
    }
}, true);
