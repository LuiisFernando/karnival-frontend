import * as Styled from './styles';

export default function Input({ label, name, register, errors, type, ...rest }: any) {
    return (
        <Styled.InputContainer>
            {label && (<label htmlFor={name}>{label}</label>)}
            <Styled.Input errors={errors[name]} {...register(name)} type={type} id={name} {...rest} className={errors[name] ? 'input-error' : ''} />
            {errors[name] && <Styled.ErrorMessage className="input-error-message">{errors[name].message}</Styled.ErrorMessage>}
        </Styled.InputContainer>
    );
}