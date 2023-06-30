import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { withSSRAuth } from "@/Utils/withAuth";
import { getUsersService } from '@/services/userService';
import Head from 'next/head';
import { Container } from '@/styles/Grid';

function Usuarios() {
    const [users, setUsers] = useState([]);

    async function getUsers() {
        const response = await getUsersService();
        console.log(response.data);
        setUsers(response.data);
    }
    useEffect(() => {
        getUsers();
        // console.log(users);
    }, []);

    return (
        <>
            <Head>
                <title>Karnival: Usuários</title>
            </Head>
            <Container>
                <h1>Usuarios</h1>

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
