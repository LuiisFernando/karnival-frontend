import * as Styled from './styles';

export default function Select({ label, name, options, register, errors, setValue, ...rest }: any) {

    function onChangeSelect(e: any) {
        debugger
        const valueSelected = Number(e.target.value);
        setValue(name, valueSelected);
    } 

    return (
        <Styled.SelectContainer>
            {label && (<label htmlFor={name}>{label}</label>)}
            <Styled.Select onChange={onChangeSelect} errors={errors[name]} {...register(name)} id={name} {...rest} className={errors[name] ? 'input-error' : ''}>
                <option value="">Selecione uma opção</option>
                {options.map((opt: any, index: number) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </Styled.Select>
            {errors[name] && <Styled.ErrorMessage className="input-error-message">{errors[name].message}</Styled.ErrorMessage>}
        </Styled.SelectContainer>
    );
}