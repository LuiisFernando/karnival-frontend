import ReactInputMastk from 'react-input-mask';
import { ErrorMessage } from '@hookform/error-message';

import * as Styled from './styles';

export default function Input({ label, name, register, errors, type, mask, ...rest }: any) {
    return (
        <Styled.InputContainer>
            {label && (<label htmlFor={name}>{label}</label>)}
            {mask ? (
                <ReactInputMastk
                    id={name}
                    className={errors[name] ? 'input-error' : ''}
                    errors={errors[name]}
                    type={type}
                    mask={mask}
                    maskChar=""
                    {...register(name)}
                >
                    {(inputProps: any) => <Styled.Input errors={errors[name]} {...inputProps} {...rest} />}
                </ReactInputMastk>
            ) : (
                <Styled.Input errors={errors[name]} {...register(name)} type={type} id={name} {...rest} className={errors[name] ? 'input-error' : ''} />
            )}
            <ErrorMessage errors={errors} name={name} render={({ message }) => (
                <Styled.ErrorMessage className="input-error-message">{message}</Styled.ErrorMessage>
            )} />
        </Styled.InputContainer>
    );
}