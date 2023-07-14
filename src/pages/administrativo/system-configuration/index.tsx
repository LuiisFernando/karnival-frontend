import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ISystemConfiguration, OpeningHour, SocialNetwork } from "@/types/SystemConfiguration";
import { Role } from "@/types/User";

import { useAuth } from "@/hooks/useAuth";

import { getWeekDayNameByIndex } from "@/Utils/Functions";
import { withSSRAuth } from "@/Utils/withAuth";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage, FieldRequested, SystemConfigurationEditSuccess } from "@/Utils/Messages.string";

import Input from "@/components/Form/Input";

import { Container } from "@/styles/Grid";
import * as AdmStyled from '@/styles/pages/administrativo/DefaultLayout';
import * as Styled from '@/styles/pages/system-configuration/styles';
import { updateSystemConfiguration } from "@/services/systemConfigurationService";

export default function SystemConfiguration() {
    const { systemConfiguration, setSystemConfiguration } = useAuth();
    const [teste, setTeste] = useState<any>();

    const { register, control, handleSubmit, formState: { errors }, setError, setValue } = useForm<any>({
        values: useMemo(() => teste, [teste])
    });

    const { fields, append, } = useFieldArray({
        control,
        name: "arrayField"
    });

    useEffect(() => {
        if (systemConfiguration) {
            let diasAbertura: any[] = [];

            systemConfiguration.openings?.map(open => {
                diasAbertura.push({
                    day: open.day,
                    day_ini: `${open.initialHour.toString()}`,
                    day_fin: `${open.finalHour.toString()}`,
                });
            });

            append(diasAbertura);

            systemConfiguration.socialNetworks.map((network) => {
                setValue(network.name, network.value);
            });

            setValue('address', systemConfiguration.address);
            setTeste(diasAbertura);
        }
    }, [systemConfiguration]);

    async function onSubmit(data: any) {
        try {
            if (!data.address)
                setError('address', { type: 'required', message: FieldRequested });
    
            let openingArr = new Array<OpeningHour>;
            let networks = new Array<SocialNetwork>;
    
            data.arrayField.map((arr: any, index: number) => {
                if (!arr.day_ini) {
                    const initialName = `arrayField.${index}.day_ini`;
                    setError(initialName, { type: 'required', message: FieldRequested });
                }
                
                if (!arr.day_fin) {
                    const finalName = `arrayField.${index}.day_fin`;
                    setError(finalName, { type: 'required', message: FieldRequested });
                }
    
                openingArr.push({
                    day: index,
                    initialHour: arr.day_ini,
                    finalHour: arr.day_fin
                });
            });
    
            networks.push({
                name: 'facebook',
                value: data.facebook
            });
    
            networks.push({
                name: 'twitter',
                value: data.twitter
            });
    
            networks.push({
                name: 'instagram',
                value: data.instagram
            });
            
            let novoSystem: ISystemConfiguration = {
                address: data.address,
                openings: openingArr,
                socialNetworks: networks
            };
            await updateSystemConfiguration(novoSystem);
            setSystemConfiguration(novoSystem);
            toast.success(SystemConfigurationEditSuccess);
        } catch (e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <Head>
                <title>Karnival: Configuração</title>
            </Head>
            <Container>
                <AdmStyled.AdministrativoContainer>
                    <h1>Configuração do Site</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Styled.ConfigurationContainer>

                            {fields.map((item: any, index) => {
                                const initialName = `arrayField.${index}.day_ini`;
                                const finalName = `arrayField.${index}.day_fin`;
                                return (
                                    <div className="control" key={index}>
                                        <span>{getWeekDayNameByIndex(index)}</span>
                                        <Input name={initialName} mask={"99:99"} register={register} errors={errors} />
                                        <Input name={finalName} mask={"99:99"} register={register} errors={errors} />
                                    </div>
                                );
                            })}
                            {systemConfiguration?.socialNetworks.map((social, index) => (
                                <div key={index} style={{ marginBottom: 20 }}>
                                    <Input label={`Link ${social.name}`} name={`${social.name}`} register={register} errors={errors} placeholder={social.name} />
                                </div>
                            ))}

                            <Input label="Endereço" name={`address`} register={register} errors={errors} placeholder="Endereço" />

                            <Styled.SubmitButton type="submit">Editar</Styled.SubmitButton>
                        </Styled.ConfigurationContainer>
                    </form>
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