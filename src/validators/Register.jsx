import * as yup from "yup";

const schemaRegister = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup
      .string()
      .email("Deve ser um email valido")
      .required("Email é obrigatório"),
    password: yup
      .string()
      .min(8, "No minimo 8 caracteres")
      .required("Senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas devem ser iguais")
      .required("As senhas não coincidem"),
    bio: yup.string().required("Este campo deve ser preenchido"),
    contact: yup.string().required("Este campo deve ser preenchido"),
});

export default schemaRegister