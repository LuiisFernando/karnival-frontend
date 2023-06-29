import React from "react";

import { Container } from "@/styles/Grid";

import * as Styled from '@/styles/pages/login/styles';
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
    const auth = useAuth();

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        toast.success("aeee");

        // const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

        // await auth.login(email, password);
    }

    return (
        <Container>
            <Styled.LoginContainer>
                <h1>Login</h1>

                <Styled.FormContainer>
                    <Styled.Form onSubmit={(e) => login(e)}>
                        <Styled.FormControl>
                            {/* <label htmlFor="user">E-mail</label> */}
                            <input id="user" name="user" placeholder="E-mail" type="email" />
                        </Styled.FormControl>

                        <Styled.FormControl className="form-label">
                            {/* <label htmlFor="password">Senha</label> */}
                            <input id="password" name="password" type="password" placeholder="Senha" />
                        </Styled.FormControl>

                        <button type="submit">Entrar</button>
                    </Styled.Form>
                </Styled.FormContainer>
            </Styled.LoginContainer>
        </Container>
    );
}