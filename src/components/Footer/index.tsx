import Link from 'next/link';
import { GrFacebook, GrInstagram, GrTwitter } from "react-icons/gr";

import { useAuth } from "@/hooks/useAuth";

import { OpeningHour } from '@/types/SystemConfiguration';
import { getWeekDayNameByIndex } from '@/Utils/Functions';

import { Container } from '@/styles/Grid';
import * as Styled from './styles';
import { useEffect, useState } from 'react';

export default function Footer() {
    const { systemConfiguration } = useAuth();
    const [socialNetworks, setSocialNetworks] = useState<any>();

    useEffect(() => {
        if (systemConfiguration) {
            const facebookLink = systemConfiguration.socialNetworks.find(x => x.name === 'facebook');
            const instagramLink = systemConfiguration.socialNetworks.find(x => x.name === 'instagram');
            const twitterLink = systemConfiguration.socialNetworks.find(x => x.name === 'twitter');

            setSocialNetworks({
                facebook: facebookLink?.value,
                instagram: instagramLink?.value,
                twitter: twitterLink?.value
            });
        }
    }, [systemConfiguration]);

    return (
        <Styled.FooterContainer>
            <Container style={{ position: 'relative', height: '100%' }}>
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
                {socialNetworks && (
                    <Styled.SocialNetworkContainer>
                        {socialNetworks.facebook && (
                            <a href={`//${socialNetworks.facebook}`} target='_blank' rel="noopener noreferrer">
                                <GrFacebook size={20} color="#FFF" />
                            </a>
                        )}
                        {socialNetworks.instagram && (
                            <a href={`//${socialNetworks.instagram}`} target='_blank' rel="noopener noreferrer">
                                <GrInstagram size={20} color="#FFF" />
                            </a>
                        )}
                        {socialNetworks.twitter  && (
                            <a href={`//${socialNetworks.twitter}`} target='_blank' rel="noopener noreferrer">
                                <GrTwitter size={20} color="#FFF" />
                            </a>
                        )}
                    </Styled.SocialNetworkContainer>
                )}
            </Container>
        </Styled.FooterContainer>
    );
}