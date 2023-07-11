import { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiArrowLeft } from "react-icons/hi";

import Select from '@/components/Form/Select';
import Input from '@/components/Form/Input';

import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, PersonProfessionalDeletedSuccess, UserActivatedSuccess, UserDeletedSuccess, UserEditedSuccess } from '@/Utils/Messages.string';
import { IUserEdit, IUserEditRequest, Role } from '@/types/User';
import { withSSRAuth } from '@/Utils/withAuth';

import { userEditSchema } from '@/Utils/schemas/user/registerUserSchema';
import { activeUser, deleteUser, getUserByIdService, updateUserService } from '@/services/userService';

import { Container } from '@/styles/Grid';
import * as StyledForm from "@/styles/Form";
import ReactSelect from 'react-select';

export default function Editar() {
    const [user, setUser] = useState<IUserEdit>();

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<IUserEdit>({
        resolver: yupResolver(userEditSchema),
        values: useMemo(() => user, [user])
    });

    const route = useRouter();

    const roleOptions = [
        {
            value: "1",
            label: 'Administrador'
        },
        {
            value: "2",
            label: 'Usuário'
        }
    ];

    useEffect(() => {
        async function getUserById() {
            const { id } = route.query;

            if (id) {
                try {
                    const userResponse = await getUserByIdService(Number(id));
                    setUser(userResponse.data);
                    setValue('roleProps', userResponse.data.roleProps);
                } catch (e: any) {
                    const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
                    toast.error(errorMessage);
                }
            }
        }
        getUserById();
    }, [route, setValue]);

    async function onSubmit(data: IUserEdit) {

        try {
            const userToUpdate: IUserEditRequest = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: Number(data.roleProps.value)
            };

            await updateUserService(userToUpdate);
            toast.success(UserEditedSuccess);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    async function handleDeleteUser() {
        try {
            if (user && user.id) {
                await deleteUser(user.id)
                toast.success(UserDeletedSuccess);
                route.push("/administrativo/usuarios");
            }
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    async function handleActiveUser() {
        try {
            if (user && user.id) {
                await activeUser(user.id)
                setUser({
                    ...user,
                    active: true
                });
                toast.success(UserActivatedSuccess);
            }
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <Head>
                <title>Karnival: Usuário</title>
            </Head>
            <Container>
                <StyledForm.FormContainer>
                    <StyledForm.FormTitleContainer>
                        <StyledForm.FormGoBackButton href="/administrativo/usuarios">
                            <HiArrowLeft size={20} />
                        </StyledForm.FormGoBackButton>
                        <h1>Edição de Usuário</h1>
                        <span></span>
                    </StyledForm.FormTitleContainer>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="name" register={register} errors={errors} placeholder="Digite o nome do usuário" />
                        <Input name="email" register={register} errors={errors} placeholder="Digite o e-mail do usuário" />
                        <Select
                            control={control}
                            options={roleOptions}
                            name="roleProps"
                            placeholder="Selecione o perfil do usuário"
                            errors={errors}
                            setValue={setValue}
                        />
                        <button type="submit">Editar</button>
                        {user && user.active && <button type="button" className="delete" onClick={() => handleDeleteUser()}>Deletar</button>}
                        {user && !user.active && <button type="button" className="active" onClick={() => handleActiveUser()}>Ativar</button>}
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