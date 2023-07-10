import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaUser } from "react-icons/fa";

import { useAuth } from '@/hooks/useAuth';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Role } from '@/types/User';

import * as Styled from './styles';

export default function Header() {
    const [subAdmActive, setSubAdmActive] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        console.log(user);
    }, [user]);

    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, () => {
        setSubAdmActive(false);
    });

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
        else if (user?.roleDescription as Role === Role.Administrador) {
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
                    <Styled.LiComSub onClick={() => setSubAdmActive(!subAdmActive)} active={subAdmActive} ref={wrapperRef}>
                        <span>Administrativo</span>
                        <div className="subMenu">
                            <Styled.ULSubMenu>
                                <li>
                                    <Link href="/administrativo/agendamento-profissional">
                                        Agendar profissional
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/administrativo/profissionais">
                                        Profissionais
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/administrativo/clientes">
                                        Clientes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/administrativo/usuarios">
                                        Usuários
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/administrativo/servicos">
                                        Serviços
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/administrativo/gerenciar-tarefas">
                                        Gerenciar Tarefas
                                    </Link>
                                </li>
                            </Styled.ULSubMenu>
                        </div>
                    </Styled.LiComSub>
                </ul>
            );
        }
        else if (user?.roleDescription as Role === Role.User) {
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
                    <li>
                        <Link href="administrativo/tarefas">
                            Tarefas
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
                            <Styled.UserContainer>
                                <span>Olá, {user.name}</span>
                                <button onClick={logout}>Sair</button>
                            </Styled.UserContainer>
                        )}
                    </Styled.NavContainer>
                </Styled.HeaderContainer>
            </Styled.HeaderWrap>
        </Styled.Header>
    );
}