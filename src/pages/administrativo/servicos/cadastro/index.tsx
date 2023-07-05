import Head from "next/head";
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";

import { Role } from "@/types/User";
import { IServiceCreate } from "@/types/Service";

import { withSSRAuth } from "@/Utils/withAuth";
import { serviceRegisterSchema } from "@/Utils/schemas/service/serviceRegisterSchema";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, ServiceCreatedSuccess } from "@/Utils/Messages.string";

import { createService } from "@/services/serviceService";

import Input from "@/components/Form/Input";
import { Container } from "@/styles/Grid";

export default function Cadastro() {

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IServiceCreate >({
        resolver: yupResolver(serviceRegisterSchema),
    });

    async function onSubmit(data: IServiceCreate ) {
        try {
            await createService(data);
            toast.success(ServiceCreatedSuccess);
            reset();
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <Head>
                <title>Karnival: Serviços</title>
            </Head>
            <Container>
                <h1>Serviço</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name="name" register={register} errors={errors} placeholder="Nome do serviço" />
                    <button type="submit">Cadastrar</button>
                </form>
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