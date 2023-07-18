import { useEffect, useId, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi";

import DatePicker, { registerLocale, CalendarContainer } from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR'
import { format } from 'date-fns';
import AsyncSelect from "react-select/async";

import { ICreateProfessionalScheduleRequest, ICreateProfessionalSchedule } from "@/types/ProfessionalSchedule";
import { Role } from "@/types/User";
import { SelectProps } from "@/types/SelectProps";

import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, FieldRequested, ProfessionalScheduleCreatedSuccess } from "@/Utils/Messages.string";
import { registerProfessionalScheduleSchema } from "@/Utils/schemas/agendamento-profissional/agendamentoProfissionalSchema";
import { withSSRAuth } from "@/Utils/withAuth";

import { getActiveProfessionals } from "@/services/personService";
import { getServices } from "@/services/serviceService";
import { createProfessionalSchedule } from "@/services/professionalScheduleService";

import Select from "@/components/Form/Select";
import InputCheckbox from "@/components/Form/InputCheckbox";

import { Container } from "@/styles/Grid";
import * as AdmStyled from '@/styles/pages/administrativo/DefaultLayout';
import * as StyledForm from "@/styles/Form";
import * as Styled from "@/styles/pages/administrativo/agendamento-profissional/styles";

registerLocale('pt-BR', ptBR);

export default function Cadastro() {
    const defaultValues: ICreateProfessionalSchedule = {
        professional: null,
        service: null,
        date: new Date(),
        paid: false
    };
    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm<any>({
        resolver: yupResolver(registerProfessionalScheduleSchema),
        defaultValues: defaultValues
    });
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [services, setServices] = useState<SelectProps[]>();

    const professionalError = errors['professional'];

    async function onSubmit(data: ICreateProfessionalSchedule) {
        try {
            const serviceToPost: ICreateProfessionalScheduleRequest = {
                professionalId: Number(data.professional?.value),
                serviceId: Number(data.service?.value),
                date: format(new Date(data.date), "yyyy-MM-dd"),
                paid: data.paid
            };

            await createProfessionalSchedule(serviceToPost);
            reset(defaultValues);
            setStartDate(new Date());

            toast.success(ProfessionalScheduleCreatedSuccess);

        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    async function filterProfessionals(inputValue: string) {
        try {
            const response = await getActiveProfessionals(inputValue);
            return response.data;
        }
        catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
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
            console.log(error);
            toast.error('ocorreu um erro ao filtrar o profissional');
        });
    }

    function selectAsync(e: any) {
        console.log('selecionado >> ', e);
        setValue('professional', e);
    }

    const calendarContainer = ({ className, children }: any) => {
        return (
            <div style={{ padding: "16px", background: "#000", color: "#fff", borderRadius: 20 }}>
                <CalendarContainer className={className}>
                    {/* <div style={{ background: "#f0f0f0" }}>
                Selecione o dia para agendar o profissional
              </div> */}
                    <div style={{ position: "relative" }}>{children}</div>
                </CalendarContainer>
            </div>
        );
    };

    async function loadServices() {
        try {
            const response = await getServices();

            if (response && response.data) {
                const serviceFormatted = response.data.map((ser, index) => {
                    const prop: SelectProps = {
                        value: ser.id.toString(),
                        label: ser.name
                    };
                    return prop;
                });
                setServices(serviceFormatted);
            }
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    return (
        <>
            <Head>
                <title>Karnival: Agendamento profissionais</title>
            </Head>
            <Container>
                <AdmStyled.AdministrativoContainer>
                    <StyledForm.FormContainer>
                        <StyledForm.FormTitleContainer>
                            <StyledForm.FormGoBackButton href="/administrativo/agendamento-profissional">
                                <HiArrowLeft size={20} />
                            </StyledForm.FormGoBackButton>
                            <h1>Agendamento Profissional</h1>
                            <span></span>
                        </StyledForm.FormTitleContainer>
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

                            <Select
                                control={control}
                                options={services}
                                name="service"
                                placeholder="Selecione o serviço"
                                errors={errors}
                                setValue={setValue}
                                isSearchable={false}
                            />

                            <DatePicker
                                {...register('date')}
                                name="date"
                                locale="pt-BR"
                                selected={startDate}
                                onChange={(date: Date) => {
                                    if (date) {
                                        setStartDate(date);
                                        setValue('date', date);
                                        console.log(format(date, "dd/MM/yyyy"))
                                    }
                                }}
                                dateFormat={"dd/MM/yyyy"}
                                calendarContainer={calendarContainer}
                                minDate={new Date()}
                                autoComplete="off"
                            />

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


export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx: any) => {
    return {
        props: {
        }
    }
}, Role.Administrador);