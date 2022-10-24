import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import schemaRegister from "../../validators/Register";
import api from "../../services/api";

import { ButtonPink, Exit } from "../../components/Buttons";
import Input from "../../components/Inputs";
import { toast } from "react-toastify";
import RegisterMain from "./style";
import { FormRegister } from "../../components/Form";
import logo from "../../img/logo.png"

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });
  const navigate = useNavigate();

  const registerUser = (data) => {
    console.log(data);
    api
      .post("/users, data")
      .then((response) => {
        toast.success("Usuário cadastrado com sucesso");
        console.log(response.data);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Não foi possível criar seu perfil");
      });
  };
  return (
    <RegisterMain>
      <img src={ logo } alt="Logo KenzieHub" />
      <Exit type="button" onClick={() => navigate("/", { replace: true })}>
        Voltar
      </Exit>

      <FormRegister onSubmit={handleSubmit(registerUser)}>
        <h1>Crie sua conta</h1>
        <h2>Rapido e grátis, vamos nessa</h2>

        <label htmlFor="name">Nome</label>
        <Input
          type="text"
          id="name"
          placeholder="Digite aqui seu nome"
          {...register("name")}
        />
        <p>{errors.name?.message}</p>

        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Digite aqui seu email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>

        <label htmlFor="password">Senha</label>
        <Input
          type="password"
          id="password"
          placeholder="Digite aqui sua senha"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <label htmlFor="confirm-password">Confirme Senha</label>
        <Input
          type="password"
          id="confirm-password"
          placeholder="Digite novamente sua senha"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>

        <label htmlFor="bio">Bio</label>
        <Input
          type="text"
          id="bio"
          placeholder="Fale sobre você"
          {...register("bio")}
        />
        <p>{errors.bio?.message}</p>

        <label htmlFor="contact">Contato</label>
        <Input
          type="text"
          id="contact"
          placeholder="Opção de contato"
          {...register("contact")}
        />
        <p>{errors.contact?.message}</p>

        <label htmlFor="module">Selecione módulo</label>
        <select id="module" {...register("module")}>
          <option>Primeiro Módulo</option>
          <option>Segundo Módulo</option>
          <option>Terceiro Módulo</option>
          <option>Quarto Módulo</option>
          <option>Quinto Módulo</option>
          <option>Sexto Módulo</option>
        </select>

        <ButtonPink type="submit">Cadastrar</ButtonPink>
      </FormRegister>
    </RegisterMain>
  );
};

export default Register;
