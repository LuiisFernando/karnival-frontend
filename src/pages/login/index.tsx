import React from "react";
import Head from "next/head";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";

import Input from '@/components/Form/Input';

import { loginSchema } from "@/Utils/schemas/user/loginSchema";

import { useAuth } from "@/hooks/useAuth";

import { Container } from "@/styles/Grid";
import * as Styled from '@/styles/pages/login/styles';

type FormData = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: yupResolver(loginSchema),
    });

    const auth = useAuth();

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        toast.success("aeee");

        // const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

        // await auth.login(email, password);
    }

    async function onSubmit(data: FormData) {
        console.log(data);
    }

    return (
        <>
            <Head>
                <title>Karnival: Login</title>
            </Head>
            <Container>
                <Styled.LoginContainer>
                    <Styled.FormContainer>
                        <h1>Login</h1>

                        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
                            <Styled.FormControl>
                                <Input name="email" register={register} errors={errors} placeholder="E-mail" />
                            </Styled.FormControl>

                            <Styled.FormControl className="form-label">
                                <Input name="password" type="password" register={register} errors={errors} placeholder="Senha" />
                            </Styled.FormControl>

                            <button type="submit">Entrar</button>
                        </Styled.Form>
                    </Styled.FormContainer>
                </Styled.LoginContainer>
            </Container>
        </>
    );
}