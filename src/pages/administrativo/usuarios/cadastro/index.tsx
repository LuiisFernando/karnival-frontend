import { GetServerSideProps } from 'next';
import Head from "next/head";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '@/components/Form/Input';
import { IUserCreate, Role } from '@/types/User';
import { withSSRAuth } from "@/Utils/withAuth";
import { userRegisterSchema } from '@/Utils/schemas/user/registerUserSchema';

import { createUser } from "@/services/userService";

import { Container } from '@/styles/Grid';
import Select from '@/components/Form/Select';
import { toast } from 'react-toastify';
import { UserCreatedSuccess, ErrorMessageDefault, ErrorMessageDefaultWithMessage } from '@/Utils/ErrorMessage.string';

function Cadastro() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IUserCreate>({
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
            toast.success(UserCreatedSuccess);
            reset();
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
                <h1>Cadastro usuário</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name="name" register={register} errors={errors} placeholder="Digite o nome do usuário" />
                    <Input name="email" register={register} errors={errors} placeholder="Digite o e-mail do usuário" />
                    <Select name="role" register={register} errors={errors} options={roleOptions} setValue={setValue}  />
                    <button type="submit">Cadastrar</button>
                </form>
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
