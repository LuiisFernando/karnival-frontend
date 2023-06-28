import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* min-height: calc(100vh - 70px); */
    margin-top: 150px;
    width: 100%;
    height: 100%;
    /* color: green; */
`;

export const FormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    /* background-color: blue; */
    padding:40px;
    border: 1px solid red;
`;

export const Form = styled.form`
    /* width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' */
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
    margin-bottom: 20px;

    input {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #EEE;
        outline: 0;
        border-radius: 5px;
        background-color: #d3d3d3;
    }
`;