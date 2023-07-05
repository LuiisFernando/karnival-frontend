import { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import Head from "next/head";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";

import { Role } from "@/types/User";
import { IService } from "@/types/Service";
import { withSSRAuth } from "@/Utils/withAuth";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from "@/Utils/Messages.string";

import { getServices } from "@/services/serviceService";

import { Container } from "@/styles/Grid";

import * as StyledFilter from '@/styles/shared/filterStyle';

export default function Servicos() {
    const [services, setServices] = useState<IService[]>([]);

    async function getAllServices() {
        try {
            const response = await getServices();
            setServices(response.data);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        getAllServices();
    }, []);

    return (
        <>
            <Head>
                <title>Karnival: Serviços</title>
            </Head>

            <Container>
                <h1>Servicos</h1>

                <StyledFilter.FilterContainer>
                    <input type="text" name="filter" placeholder="Filtre por Nome ou E-mail" />

                    <Link href="/administrativo/servicos/cadastro">Cadastrar</Link>
                </StyledFilter.FilterContainer>

                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services?.map((service: IService, index: any) => (
                            <tr key={index}>
                                <td>{service.name}</td>
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
}, Role.Administrador);