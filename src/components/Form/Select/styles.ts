import styled from 'styled-components';
import ReactSelect from 'react-select';

interface SelectProps {
    errors: any;
}

export const SelectContainer = styled.div<SelectProps>`
    position: relative;
    border-radius: 5px;
    width: 100%;
    height: 60px;
`;


export const Select = styled(ReactSelect)<SelectProps>`
    width: 100%;
    height: 40px;
    outline: 0;
    border-radius: 5px;
    outline: 0;
`;

export const ErrorMessage = styled.span`
    position: absolute;
    right: 5px;
    top: 0;

    color: red;
    font-size: 10px;
`;