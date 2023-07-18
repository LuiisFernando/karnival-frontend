import * as Styled from './styles';

export default function InputCheckbox({ label, control, name, register, errors, ...rest  }: any) {
    return (
        <Styled.InputCheckboxContainer>
            <input
                {...rest}
                {...register(name)}
                id={name}
                errors={errors[name]}
                name={name}
                type="checkbox"
            />
            <label htmlFor={name}>{label}</label>
        </Styled.InputCheckboxContainer>
    );
}