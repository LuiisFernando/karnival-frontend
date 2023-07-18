import Head from "next/head";
import Link from "next/link";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

import Input from "@/components/Form/Input";
import InputCheckbox from "@/components/Form/InputCheckbox";

import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from "@/Utils/Messages.string";

import { getActiveProfessionals } from "@/services/personService";

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

                </AdmStyled.AdministrativoContainer>
            </Container>
        </>
    );
}