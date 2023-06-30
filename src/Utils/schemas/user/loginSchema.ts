import * as yup from "yup";

const errorMessageSenha = 'A senha deve conter 8 caracteres 1 especial 1 maiusculo 1 minisculo e pelo menos 1 especial.'

export const loginSchema = yup.object({
    email: yup.string().email('Insira um e-mail valido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
});


export const userRegisterSchema = yup.object({
    email: yup.string().email('Insira um e-mail valido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&)(+=])[A-Za-z\d@$!%*?&)(+=]{8,}$/g, errorMessageSenha)
        .min(8, 'Minimo 8 caracteres'),
});
