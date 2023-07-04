import styled from 'styled-components';
import * as C from '@/styles/Constants';

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    width: 100%;
    height: 100%;

    @media (min-width: ${C.XL}) {
        margin-top: 100px;
    }
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    padding: 20px 40px 40px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 12px;

    h1 {
        margin-bottom: 20px;
    }
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    button {
        width: 100%;
        height: 40px;
    }
`;

export const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;