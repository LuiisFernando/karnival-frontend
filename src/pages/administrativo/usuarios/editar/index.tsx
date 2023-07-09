import { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiArrowLeft } from "react-icons/hi";

import Select from '@/components/Form/Select';
import Input from '@/components/Form/Input';

import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, PersonProfessionalEditedSuccess } from '@/Utils/Messages.string';
import { IPerson, } from '@/types/Person';
import { IUserEdit, Role } from '@/types/User';
import { onlyNumbers } from '@/Utils/Functions';
import { maskCellphone } from '@/Utils/masks';
import { withSSRAuth } from '@/Utils/withAuth';

import { userEditSchema } from '@/Utils/schemas/user/registerUserSchema';

import { Container } from '@/styles/Grid';
import * as StyledForm from "@/styles/Form";

export default function Editar() {
    const [user, setUser] = useState<IUserEdit>();
    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<IUserEdit>({
        resolver: yupResolver(userEditSchema),
        values: useMemo(() => user, [user])
    });

    const route = useRouter();

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

    useEffect(() => {
        async function getPersonById() {
            const { id } = route.query;

            if (id) {
                try {
                    // const personResponse = await getPersonClient(Number(id));
                    // setPerson(personResponse.data);
                    // setValue('cellphone', personResponse.data.cellphone);
                } catch (e: any) {
                    const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
                    toast.error(errorMessage);
                }
            }
        }
        getPersonById();
    }, [route, reset]);

    async function onSubmit(data: IUserEdit) {

        try {
            console.log(data);

            // await updatePersonClient(data);
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
                            name="role"
                            placeholder="Selecione o perfil do usuário"
                            errors={errors}
                            setValue={setValue}
                        />
                        <button type="submit">Editar</button>
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