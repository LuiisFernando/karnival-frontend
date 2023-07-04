import Head from "next/head";
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";

import { withSSRAuth } from "@/Utils/withAuth";
import { IPersonProfessionalCreate } from "@/types/Person";
import { personRegisterSchema } from "@/Utils/schemas/person/personRegisterSchema";

import Input from "@/components/Form/Input";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, PersonProfessionalCreatedSuccess } from "@/Utils/ErrorMessage.string";
import { maskCellphone } from "@/Utils/masks";

import { Container } from "@/styles/Grid";
import { onlyNumbers } from "@/Utils/Functions";
import { createPersonProfessional } from "@/services/personService";

export default function Cadastro() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IPersonProfessionalCreate>({
        resolver: yupResolver(personRegisterSchema),
    });

    async function onSubmit(data: IPersonProfessionalCreate) {
        try {
            data.cellphone = onlyNumbers(data.cellphone);
            await createPersonProfessional(data);
            toast.success(PersonProfessionalCreatedSuccess);
            reset();
            setValue('cellphone', "");
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }


    return (
        <>
            <Head>
                <title>Karnival: Profissionais</title>
            </Head>
            <Container>
                <h1>Profissionais</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name="name" register={register} errors={errors} placeholder="Nome do profissional" />
                    <Input name="email" register={register} errors={errors} placeholder="E-mail do profissional" />
                    <Input name="cellphone" mask={maskCellphone} register={register} errors={errors} placeholder="Celular do profissional" />
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
}, true);