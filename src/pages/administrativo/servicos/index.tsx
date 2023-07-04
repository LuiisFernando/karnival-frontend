import Head from "next/head";
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";

import { withSSRAuth } from "@/Utils/withAuth";

import { Container } from "@/styles/Grid";

export default function Servicos() {
    return (
        <>
            <Head>
                <title>Karnival: Serviços</title>
            </Head>

            <Container>
                <h1>Servicos</h1>
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