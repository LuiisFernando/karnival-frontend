import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ISystemConfiguration } from '@/types/SystemConfiguration';
import { getSystemConfiguration } from '@/services/systemConfigurationService';

import { Container } from '@/styles/Grid';
import * as Styled from './styles';

export default function Footer() {
    const [systemConfiguration, setSystemConfiguration] = useState<ISystemConfiguration>();

    function getWeekDayName(indice: number) {
        const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

        return diasSemana[indice];
    }

    useEffect(() => {
        async function loadInfo() {
            try {
                const response = await getSystemConfiguration();
                setSystemConfiguration(response.data);
            } catch {

            }
        }
        loadInfo();
        console.log('footer')
    }, []);

    return (
        <Styled.FooterContainer>
            <Container>
                <Styled.FooterWrap>
                    <Styled.Opening>
                        <span>Horário de Funcionamento</span>
                        {systemConfiguration?.openings.map((open, index) => (
                            <Styled.OpeningContainer key={index}>
                                    {getWeekDayName(open.day)} {open.initialHour} - {open.finalHour}
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