import { useState, useRef } from 'react';
import Link from 'next/link';
import { FaUser } from "react-icons/fa";

import { useAuth } from '@/hooks/useAuth';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Role } from '@/types/User';

import * as Styled from './styles';

export default function Header() {
    const [subAdmActive, setSubAdmActive] = useState(false);
    const { user, logout } = useAuth();

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
        else if (user?.role === Role.Administrador) {
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
                                    <Link href="/dashboard/agendamento-profissional">
                                        Agendar profissional
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/profissionais">
                                        Profissionais
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/clientes">
                                        Clientes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/usuarios">
                                        Usuários
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/tarefas">
                                        Tarefas
                                    </Link>
                                </li>
                            </Styled.ULSubMenu>
                        </div>
                    </Styled.LiComSub>
                </ul>
            );
        }
        else if (user?.role === Role.User) {
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
                        <Link href="dashboard/tarefas">
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