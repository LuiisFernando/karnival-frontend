import styled from 'styled-components';
import ReactSelect from 'react-select';

interface SelectProps {
    errors: any;
}

export const SelectContainer = styled.div<SelectProps>`
    position: relative;
    /* height: 60px; */
    border-radius: 5px;
    height: 40px;

    /* border: ${props => props.errors ? '1px solid red !important' : '0'}; */
`;


export const Select = styled(ReactSelect)<SelectProps>`
    /* border: ${props => props.errors ? '1px solid red !important' : '0'}; */

    width: 100%;
    height: 40px;
    /* padding: 0 10px; */
    /* border: 1px solid #d3d3d3; */
    outline: 0;
    border-radius: 5px;
    outline: 0;
    /* border: 0; */
`;

export const ErrorMessage = styled.span`
    position: absolute;
    right: 5px;
    top: 0;

    color: red;
    font-size: 10px;
`;