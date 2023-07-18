import Head from "next/head";
import Link from "next/link";

import CalendarComponent from "@/components/Calendar";

import { Container } from "@/styles/Grid";
import * as AdmStyled from '@/styles/pages/administrativo/DefaultLayout';
import * as StyledFilter from '@/styles/shared/filterStyle';

export default function AgendamentoProfissional() {
    return (
        <>
            <Head>
                <title>Karnival: Agendamento profissionais</title>
            </Head>
            <Container>
                <AdmStyled.AdministrativoContainer>
                    <h1>agendamento profissional</h1>

                    <StyledFilter.FilterContainer>
                        <input type="text" name="filter" placeholder="Filtre por Nome ou E-mail" />

                        <Link href="/administrativo/agendamento-profissional/cadastro">Cadastrar</Link>
                    </StyledFilter.FilterContainer>

                    <CalendarComponent views={["month", "week", "day", "agenda"]} />

                </AdmStyled.AdministrativoContainer>
            </Container>
        </>
    );
}