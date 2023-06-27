import Link from 'next/link';
import * as Styled from './styles';

export default function Header() {

    function renderMenu() {
        return (
            <ul>
                <li>
                    <Link href="/">
                        Home
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
                    <Link href="servicos">
                        Serviços
                    </Link>
                </li>
            </ul>
        );
    }

    return (
        <Styled.Header>
            <Styled.HeaderWrap>
                <Styled.HeaderTitle href="/">KARNIVAL</Styled.HeaderTitle>
                <Styled.Navbar>
                    {renderMenu()}
                </Styled.Navbar>
            </Styled.HeaderWrap>
            <Styled.HeaderWrap>
                <Styled.Navbar>
                    <ul>
                        <li>
                            <Link href="login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </Styled.Navbar>
            </Styled.HeaderWrap>
        </Styled.Header>
    );
}