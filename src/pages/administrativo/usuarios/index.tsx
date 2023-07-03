import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { toast } from 'react-toastify';

import { withSSRAuth } from "@/Utils/withAuth";
import { getUsersService } from '@/services/userService';
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from '@/Utils/ErrorMessage.string';

import { Container } from '@/styles/Grid';

import * as Styled from '@/styles/pages/administrativo/usuarios/styles';

function Usuarios() {
    const [users, setUsers] = useState([]);

    async function getUsers() {
        try {
            const response = await getUsersService();
            console.log(response.data);
            setUsers(response.data);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Head>
                <title>Karnival: Usuários</title>
            </Head>
            <Container>
                <h1>Usuarios</h1>


                <Styled.FilterContainer>
                    <input type="text" name="filter" placeholder="Filtre por Nome ou E-mail" />

                    <Link href="/administrativo/usuarios/cadastro">Cadastrar</Link>
                </Styled.FilterContainer>

                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Perfil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: any, index: any) => (
                            <tr key={index}>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>

        </>
    );
}

export default Usuarios;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx: any) => {
    return {
        props: {
        }
    }
}, true);
