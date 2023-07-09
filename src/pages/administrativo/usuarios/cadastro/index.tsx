import { useRef } from 'react';
import { GetServerSideProps } from 'next';
import Head from "next/head";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { HiArrowLeft } from "react-icons/hi";

import Select from '@/components/Form/Select';
import Input from '@/components/Form/Input';

import { IUserCreate, Role } from '@/types/User';
import { withSSRAuth } from "@/Utils/withAuth";
import { userRegisterSchema } from '@/Utils/schemas/user/registerUserSchema';
import { UserCreatedSuccess, ErrorMessageDefault, ErrorMessageDefaultWithMessage } from '@/Utils/Messages.string';

import { createUser } from "@/services/userService";

import { Container } from '@/styles/Grid';
import * as StyledForm from "@/styles/Form";

function Cadastro() {
    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<IUserCreate>({
        resolver: yupResolver(userRegisterSchema),
    });

    const roleOptions = [
        {
            value: 1,
            label: 'Administrador'
        },
        {
            value: 2,
            label: 'Usuário'
        }
    ];

    async function onSubmit(data: IUserCreate) {
        try {
            await createUser(data);
            // console.log(data);
            toast.success(UserCreatedSuccess);
            reset();
            // setValue('role', );
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <Head>
                <title>Karnival: Cadastro de usuário</title>
            </Head>
            <Container>
                <StyledForm.FormContainer>
                    <StyledForm.FormTitleContainer>
                        <StyledForm.FormGoBackButton href="/administrativo/usuarios">
                            <HiArrowLeft size={20} />
                        </StyledForm.FormGoBackButton>
                        <h1>Cadastro usuário</h1>
                        <span></span>
                    </StyledForm.FormTitleContainer>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="name" register={register} errors={errors} placeholder="Digite o nome do usuário" />
                        <Input name="email" register={register} errors={errors} placeholder="Digite o e-mail do usuário" />
                        <Select
                            control={control}
                            options={roleOptions}
                            name="role"
                            placeholder="Selecione o perfil do usuário"
                            errors={errors}
                            setValue={setValue}
                        />
                        <button type="submit">Cadastrar</button>
                    </form>
                </StyledForm.FormContainer>
            </Container>
        </>
    );
}

export default Cadastro;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx: any) => {
    return {
        props: {
        }
    }
}, Role.Administrador);
