import { useId } from 'react';
import { Controller } from 'react-hook-form';

import * as Styled from './styles';

export default function Select({ control, label, name, options, errors, setValue, placeholder, inputRef, ...rest }: any) {

    function onChangeSelect(event: any) {
        // Overwrite the event with your own object if it doesn't exist
        if (!event) {
          event = {
            target: inputRef,
            value: '',
          };
        }
        setValue(name, event);

        // onChange(event);
      }

    const error = errors[name]?.message || errors[name]?.label?.message;

    return (
        <Styled.SelectContainer errors={error}>
            {label && (<label htmlFor={name}>{label}</label>)}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Styled.Select
                        {...field}
                        {...rest}
                        ref={inputRef}
                        options={options}
                        onChange={onChangeSelect}
                        instanceId={useId}
                        placeholder={placeholder}
                        errors={error}
                        styles={{
                            control: (baseStyle) => ({
                                ...baseStyle,
                                borderColor: error ? 'red' : '#d3d3d3',
                                boxShadow: 0,
                                fontWeight: '100',

                                "&:hover": {
                                    borderColor: error ? 'red' : '#d3d3d3',
                                    boxShadow: 0,
                                }
                            })
                        }}
                    />
                )}
            />
            {error && <Styled.ErrorMessage className="input-error-message">{error}</Styled.ErrorMessage>}
        </Styled.SelectContainer>
    );
}