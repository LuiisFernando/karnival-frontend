import Head from "next/head";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";

import { IPersonRegister } from "@/types/Person";
import { personRegisterSchema } from "@/Utils/schemas/person/personRegisterSchema";

import Input from "@/components/Form/Input";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from "@/Utils/ErrorMessage.string";

import { Container } from "@/styles/Grid";

export default function Profissionais() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IPersonRegister>({
        resolver: yupResolver(personRegisterSchema),
    });

    async function onSubmit(data: any) {
        try {
            // await createUser(data);
            // toast.success(UserCreatedSuccess);
            // reset();
            console.log(data);
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
                    <Input name="cellphone" register={register} errors={errors} placeholder="Celular do profissional" />
                    <button type="submit">Cadastrar</button>
                </form>
            </Container>
        </>
    );
}