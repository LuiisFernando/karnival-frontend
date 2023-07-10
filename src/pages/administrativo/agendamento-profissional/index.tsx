import { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import { Role } from '@/types/User';
import { withSSRAuth } from "@/Utils/withAuth";

import { Container } from "@/styles/Grid";
import * as AdmStyled from '@/styles/pages/administrativo/DefaultLayout';

export default function AgendamentoProfissional() {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

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

    function onChange(e: any) {
        console.log(e);
    }

    const filterColors = (inputValue: string) => {
        return colourOptions.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    function loadOptions(inputValue: string, callback: (options: any[]) => void) {
        console.log(inputValue);
        console.log(callback);
        callback(filterColors(inputValue));
    }

    function selectAsync(e: any) {
        console.log('selecionado >> ', e);
    }

    return (
        <>
            <Head>
                <title>Karnival: Agendamento profissionais</title>
            </Head>
            <Container>
                <AdmStyled.AdministrativoContainer>
                    <h1>agendamento profissional</h1>

                    <Select
                        defaultValue={selectedOption}
                        onChange={onChange}
                        options={options}
                        isClearable
                        isSearchable={false}
                        placeholder="selecione"
                    />

                    <AsyncSelect
                        isClearable
                        isSearchable
                        placeholder="selecione"
                        loadOptions={loadOptions}
                        defaultOptions
                        cacheOptions
                        onChange={selectAsync}
                    />
                </AdmStyled.AdministrativoContainer>

            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx: any) => {
    return {
        props: {
        }
    }
}, Role.Administrador);
