import Head from "next/head";
import { GetServerSideProps } from 'next';

import { withSSRAuth } from "@/Utils/withAuth";

import { Container } from "@/styles/Grid";

export default function Tarefas() {
    return (
        <>
            <Head>
                <title>Karnival: Tarefas</title>
            </Head>
            <Container>
                <h1>Tarefas</h1>
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
