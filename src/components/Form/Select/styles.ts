import styled from 'styled-components';


export const SelectContainer = styled.div`
    position: relative;
    height: 60px;
`;

interface SelectProps {
    errors: any;
}

export const Select = styled.select<SelectProps>`
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