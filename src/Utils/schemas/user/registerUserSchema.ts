import * as yup from "yup";

export const userRegisterSchema = yup.object({
    name: yup.string().min(3, "Digite pelo menos 3 caracteres").required('Campo obrigatório'),
    email: yup.string().email('Insira um e-mail valido').required('Campo obrigatório'),
    role: yup.number().required().positive().integer().typeError('Selecione uma opção valida')
});
