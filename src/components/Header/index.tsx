import Link from 'next/link';
import { FaUser } from "react-icons/fa";

import { useAuth } from '@/hooks/useAuth';

import * as Styled from './styles';
import { Role } from '@/types/Login';

export default function Header() {

    const { user, logout } = useAuth();

    function renderMenu() {
        if (!user) {
            return (
                <ul>
                    <li>
                        <Link href="/">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/eventos">
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link href="/agenda">
                            Agenda
                        </Link>
                    </li>
                    <li>
                        <Link href="/servicos">
                            Serviços
                        </Link>
                    </li>
                </ul>
            );
        }
        else if (user?.role === Role.Administrador) {
            return (
                <ul>
                    <li>
                        <Link href="/">
                            Inicio oi  adm
                        </Link>
                    </li>
                    <li>
                        <Link href="/eventos">
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link href="/agenda">
                            Agenda
                        </Link>
                    </li>
                    <li>
                        <Link href="/servicos">
                            Serviços
                        </Link>
                    </li>
                </ul>
            );
        }
        else if (user?.role === Role.User) {
            return (
                <ul>
                    <li>
                        <Link href="/">
                            Inicio oi  user
                        </Link>
                    </li>
                    <li>
                        <Link href="/eventos">
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link href="/agenda">
                            Agenda
                        </Link>
                    </li>
                    <li>
                        <Link href="/servicos">
                            Serviços
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <Styled.Header>
            <Styled.HeaderWrap>
                <Styled.HeaderContainer>
                    <Styled.HeaderTitle href="/">KARNIVAL</Styled.HeaderTitle>
                    <Styled.NavContainer>
                        <Styled.Navbar>
                            {renderMenu()}
                        </Styled.Navbar>
                        {!user && (
                            <Link href="/login">
                                <FaUser size={20} color="#000" />
                            </Link>
                        )}
                        {user && (
                            <div>
                                <span>Olá, {user.name}</span>
                                <button onClick={logout}>Sair</button>
                            </div>
                        )}
                    </Styled.NavContainer>
                </Styled.HeaderContainer>
            </Styled.HeaderWrap>
        </Styled.Header>
    );
}