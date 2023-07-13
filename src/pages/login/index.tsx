import React, { useEffect } from "react";
import Head from "next/head";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '@/components/Form/Input';

import { loginSchema } from "@/Utils/schemas/user/loginSchema";

import { useAuth } from "@/hooks/useAuth";

import { ILoginForm } from "@/types/User";

import { Container } from "@/styles/Grid";
import * as Styled from '@/styles/pages/login/styles';

export default function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ILoginForm>({
        resolver: yupResolver(loginSchema),
    });

    const { login, resetAll } = useAuth();

    useEffect(() => {
        resetAll();
    }, []);

    async function onSubmit(data: ILoginForm) {
        await login(data);
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