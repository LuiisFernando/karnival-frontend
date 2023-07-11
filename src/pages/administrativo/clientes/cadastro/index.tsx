import { useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi";

import Input from "@/components/Form/Input";

import { Role } from "@/types/User";
import { IPersonCreate  } from "@/types/Person";

import { withSSRAuth } from "@/Utils/withAuth";
import { personRegisterSchema } from "@/Utils/schemas/person/personRegisterSchema";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, PersonCreatedSuccess } from "@/Utils/Messages.string";
import { onlyNumbers } from "@/Utils/Functions";
import { maskCellphone } from "@/Utils/masks";

import { createPersonClient } from "@/services/personService";

import { Container } from "@/styles/Grid";
import * as StyledForm from "@/styles/Form";

export default function Cadastro() {
    const initialValues: IPersonCreate = {
        name: "",
        cellphone: "",
        email: "",
        provider: true
    };
    const { register, handleSubmit, formState: { errors }, reset, setValue, setFocus } = useForm<IPersonCreate>({
        resolver: yupResolver(personRegisterSchema),
        values: initialValues
    });

    async function onSubmit(data: IPersonCreate ) {
        try {
            if (data.cellphone)
                data.cellphone = onlyNumbers(data.cellphone);

            await createPersonClient(data);
            toast.success(PersonCreatedSuccess);
            reset();
            setValue('cellphone', "");
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        setFocus('name');
    }, [setFocus, setValue]);

    return (
        <>
            <Head>
                <title>Karnival: Clientes</title>
            </Head>
            <Container>
                <StyledForm.FormContainer>
                    <StyledForm.FormTitleContainer>
                        <StyledForm.FormGoBackButton href="/administrativo/clientes">
                            <HiArrowLeft size={20} />
                        </StyledForm.FormGoBackButton>
                        <h1>Cadastro de Cliente</h1>
                        <span></span>
                    </StyledForm.FormTitleContainer>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="name" register={register} errors={errors} placeholder="Nome do cliente" />
                        <Input name="email" register={register} errors={errors} placeholder="E-mail do cliente" />
                        <Input name="cellphone" mask={maskCellphone} register={register} errors={errors} placeholder="Celular do cliente" />
                        <button type="submit">Cadastrar</button>
                    </form>
                </StyledForm.FormContainer>

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