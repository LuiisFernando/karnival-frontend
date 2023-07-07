import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { personEditSchema } from "@/Utils/schemas/person/personRegisterSchema";

import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, PersonProfessionalEditedSuccess } from '@/Utils/Messages.string';
import { getPersonClient, updatePersonClient } from '@/services/personService';
import { IPerson, } from '@/types/Person';
import Head from 'next/head';
import { Container } from '@/styles/Grid';
import { onlyNumbers } from '@/Utils/Functions';
import { maskCellphone } from '@/Utils/masks';
import Input from '@/components/Form/Input';
import { GetServerSideProps } from 'next';

interface EditProps {
    client: IPerson;
}

export default function Editar({ client }: EditProps) {
    const route = useRouter();
    const { register, handleSubmit, formState: { errors }, reset, setValue, } = useForm<IPerson>({
        resolver: yupResolver(personEditSchema),
        defaultValues: client
    });
    
    useEffect(() => {
        async function getPersonById() {
            const { id } = route.query;
            if (id) {
                try {
                    // const personResponse = await getPersonClient(Number(id));
                    // console.log(personResponse.data)
                    // reset(personResponse.data);
                    // setValue('cellphone', personResponse.data.cellphone);
                } catch(e: any) {
                    const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
                    toast.error(errorMessage);
    
                }
            }
        }
        // getPersonById();
    }, [route, reset]);

    async function onSubmit(data: IPerson ) {
        
        try {
            if (data.cellphone)
                data.cellphone = onlyNumbers(data.cellphone);
                
                console.log(data);
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


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    // const { id }: any = params;
    const client = {id: 2, name: 'cliente 12', email: 'cliente12@mail.com', cellphone: '23423234234', provider: false};
    return {
      props: {
        client
      }
    }
  }