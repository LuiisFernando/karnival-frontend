import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { IUser, Role } from '@/types/User';
import { withSSRAuth } from "@/Utils/withAuth";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from '@/Utils/Messages.string';
import { getUsersService } from '@/services/userService';

import { Container } from '@/styles/Grid';

import * as Styled from '@/styles/pages/administrativo/usuarios/styles';
import * as AdmStyled from '@/styles/pages/administrativo/DefaultLayout';

function Usuarios() {
    const [users, setUsers] = useState<IUser[]>([]);

    const route = useRouter();

    async function getUsers() {
        try {
            const response = await getUsersService();
            setUsers(response.data);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    function edit(id: number) {
        route.push(`/administrativo/usuarios/editar?id=${id}`);
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
                <AdmStyled.AdministrativoContainer>
                    <h1>Usuários</h1>


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
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user: IUser, index: any) => (
                                <tr key={index} onClick={() => edit(user.id)}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roleDescription}</td>
                                    <td className={user.active ? 'active' : 'deleted'}>{user.active ? "Ativo" : "Excluído"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </AdmStyled.AdministrativoContainer>
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
}, Role.Administrador);
