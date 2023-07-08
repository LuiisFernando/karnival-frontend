import { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '@/components/Form/Input';

import { personEditSchema } from "@/Utils/schemas/person/personRegisterSchema";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, PersonProfessionalEditedSuccess } from '@/Utils/Messages.string';
import { IPerson, } from '@/types/Person';
import { Role } from '@/types/User';
import { onlyNumbers } from '@/Utils/Functions';
import { maskCellphone } from '@/Utils/masks';
import { withSSRAuth } from '@/Utils/withAuth';

import { getPersonClient, updatePersonClient } from '@/services/personService';

import { Container } from '@/styles/Grid';


export default function Editar() {
    const [person, setPerson] = useState<IPerson>();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IPerson>({
        resolver: yupResolver(personEditSchema),
        values: useMemo(() => person, [person])
    });

    const route = useRouter();
    
    useEffect(() => {
        async function getPersonById() {
            const { id } = route.query;

            if (id) {
                try {
                    const personResponse = await getPersonClient(Number(id));
                    setPerson(personResponse.data);
                    setValue('cellphone', personResponse.data.cellphone);
                } catch(e: any) {
                    const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
                    toast.error(errorMessage);
                }
            }
        }
        getPersonById();
    }, [route, reset]);

    async function onSubmit(data: IPerson ) {
        
        try {
            if (data.cellphone)
                data.cellphone = onlyNumbers(data.cellphone);

            await updatePersonClient(data);
            toast.success(PersonProfessionalEditedSuccess);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <Head>
                <title>Karnival: Clientes</title>
            </Head>
            <Container>
                <h1>Cliente</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name="name" register={register} errors={errors} placeholder="Nome do cliente" />
                    <Input name="email" register={register} errors={errors} placeholder="E-mail do cliente" />
                    <Input name="cellphone" mask={maskCellphone} register={register} errors={errors} placeholder="Celular do cliente" />
                    <button type="submit">Editar</button>
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