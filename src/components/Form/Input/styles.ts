import styled from 'styled-components';

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
`;

interface InputProps {
    errors: any;
}

export const Input = styled.input<InputProps>`
    border: ${props => props.errors ? '1px solid red !important' : '0'};

    width: 100%;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #d3d3d3;
    outline: 0;
    border-radius: 5px;
`;

export const ErrorMessage = styled.span`
    position: absolute;
    right: 5px;
    top: 0;

    color: red;
    font-size: 10px;
`;