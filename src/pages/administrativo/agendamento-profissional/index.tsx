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

    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm<any>({
        // resolver: yupResolver(personRegisterSchema),
        // values: initialValues
    });

    const colourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
    ];


    async function onSubmit(data: any) {
        try {
            console.log(data);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    const filterColors = (inputValue: string) => {
        return colourOptions.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    async function filterProfessionals(inputValue: string) {
        const response = await getActiveProfessionals(inputValue);
        return response.data;
    }

    function loadOptions(inputValue: string, callback: (options: any[]) => void) {
        filterProfessionals(inputValue).then((response: any) => {

            if (response && response.length > 0) {
                const profissionals = response.map((rep: any) => {
                    return {
                        value: rep.id,
                        label: rep.name
                    };
                });
                callback(profissionals);
            } else {
                callback([]);
            }
        }).catch((error: any) => {
            toast.error('ocorreu um erro ao filtrar o profissional');
        });
    }

    function selectAsync(e: any) {
        console.log('selecionado >> ', e);
        setValue('professional', e);
    }

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