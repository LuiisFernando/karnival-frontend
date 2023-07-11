import Head from "next/head";
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi";

import Input from "@/components/Form/Input";

import { createPersonProfessional } from "@/services/personService";

import { Role } from "@/types/User";
import { IPersonCreate } from "@/types/Person";

import { withSSRAuth } from "@/Utils/withAuth";
import { personRegisterSchema } from "@/Utils/schemas/person/personRegisterSchema";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, PersonProfessionalCreatedSuccess } from "@/Utils/Messages.string";
import { maskCellphone } from "@/Utils/masks";
import { onlyNumbers } from "@/Utils/Functions";

import { Container } from "@/styles/Grid";
import * as StyledForm from "@/styles/Form";
import { useEffect } from "react";

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

    async function onSubmit(data: IPersonCreate) {
        try {
            if (data.cellphone)
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

    useEffect(() => {
        setFocus('name');
    }, []);

    return (
        <>
            <Head>
                <title>Karnival: Profissionais</title>
            </Head>
            <Container>
                <StyledForm.FormContainer>
                    <StyledForm.FormTitleContainer>
                        <StyledForm.FormGoBackButton href="/administrativo/profissionais">
                            <HiArrowLeft size={20} />
                        </StyledForm.FormGoBackButton>
                        <h1>Profissionais</h1>
                        <span></span>
                    </StyledForm.FormTitleContainer>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="name" register={register} errors={errors} placeholder="Nome do profissional" />
                        <Input name="email" register={register} errors={errors} placeholder="E-mail do profissional" />
                        <Input name="cellphone" mask={maskCellphone} register={register} errors={errors} placeholder="Celular do profissional" />
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