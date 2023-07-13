import Link from 'next/link';

import { useAuth } from "@/hooks/useAuth";

import { OpeningHour } from '@/types/SystemConfiguration';
import { getWeekDayNameByIndex } from '@/Utils/Functions';

import { Container } from '@/styles/Grid';
import * as Styled from './styles';

export default function Footer() {
    const { systemConfiguration } = useAuth();
    return (
        <Styled.FooterContainer>
            <Container>
                <Styled.FooterWrap>
                    <Styled.Opening>
                        <span>Horário de Funcionamento</span>
                        {systemConfiguration?.openings.map((open: OpeningHour, index: any) => (
                            <Styled.OpeningContainer key={index}>
                                    {getWeekDayNameByIndex(open.day)} {open.initialHour} - {open.finalHour}
                            </Styled.OpeningContainer>
                        ))}
                    </Styled.Opening>
                    <Styled.AddressContainer>
                        <span>Endereço</span>
                        <p style={{ color: '#FFF' }}>{systemConfiguration?.address}</p>
                    </Styled.AddressContainer>
                    <Styled.PagesContainer>
                        <span>Paginas</span>
                        <Link href="/eventos">Eventos</Link>
                        <Link href="/agenda">Agenda</Link>
                        <Link href="/servicos">Serviços</Link>
                    </Styled.PagesContainer>
                </Styled.FooterWrap>
                <Styled.SocialNetworkContainer>
                    <p  style={{ color: '#FFF' }}>instagram</p>
                </Styled.SocialNetworkContainer>
            </Container>
        </Styled.FooterContainer>
    );
}