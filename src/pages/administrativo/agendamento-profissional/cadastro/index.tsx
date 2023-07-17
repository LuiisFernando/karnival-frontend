import { useId } from "react";
import Head from "next/head";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

import Input from "@/components/Form/Input";
import InputCheckbox from "@/components/Form/InputCheckbox";

import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, FieldRequested } from "@/Utils/Messages.string";
import { registerProfessionalScheduleSchema } from "@/Utils/schemas/agendamento-profissional/agendamentoProfissionalSchema";

import { getActiveProfessionals } from "@/services/personService";
import { ProfessionalSchedule } from "@/types/ProfessionalSchedule";

import { Container } from "@/styles/Grid";
import * as AdmStyled from '@/styles/pages/administrativo/DefaultLayout';
import * as StyledForm from "@/styles/Form";
import * as Styled from "@/styles/pages/administrativo/agendamento-profissional/styles";

export default function Cadastro() {
    const defaultValues: ProfessionalSchedule = {
        professional: null,
        date: "",
        paid: false
    };
    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm<any>({
        resolver: yupResolver(registerProfessionalScheduleSchema),
    });

    
    const professionalError = errors['professional'];

    async function onSubmit(data: any) {
        try {
            console.log(data);
            reset(defaultValues);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    async function filterProfessionals(inputValue: string) {
        const response = await getActiveProfessionals(inputValue);
        return response.data;
    }

    function loadOptions(inputValue: string, callback: (options: any[]) => void) {
        console.log('loaded')
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
            console.log(error);
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
                    <StyledForm.FormContainer>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <Styled.SelectContainer errors={professionalError}>
                                <Controller
                                    name="professional"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            instanceId={`${useId}`}
                                            isClearable
                                            isSearchable
                                            placeholder="Selecione o profissional"
                                            noOptionsMessage={() => "Nenhum profissional encontrado"}
                                            loadingMessage={() => "Carregando ..."}
                                            loadOptions={loadOptions}
                                            defaultOptions
                                            cacheOptions
                                            onChange={selectAsync}
                                            styles={{
                                                control: (baseStyle) => ({
                                                    ...baseStyle,
                                                    width: '100%',
                                                    boxShadow: 'none',
                                                    borderColor: professionalError ? 'red' : '#d3d3d3',
                                                    '&:hover': {
                                                        borderColor: professionalError ? 'red' : '#d3d3d3',
                                                    }
                                                }),
                                                container: (baseStyle) => ({
                                                    ...baseStyle,
                                                    width: '100%',
                                                    marginBottom: 20
                                                })
                                            }}
                                        />
                                    )}
                                />
                                {professionalError && <Styled.ErrorMessage className="input-error-message">{FieldRequested}</Styled.ErrorMessage>}
                            </Styled.SelectContainer>

                            <Input name="date" register={register} errors={errors} placeholder="Data do agendamento" />
                            <InputCheckbox
                                label="Profissional pagou a diaria"
                                register={register}
                                errors={errors}
                                control={control}
                                name="paid"
                            />


                            <button type="submit">Cadastrar</button>
                        </form>
                    </StyledForm.FormContainer>
                </AdmStyled.AdministrativoContainer>
            </Container>
        </>
    );
}