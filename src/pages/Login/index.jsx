import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import schemaLogin from "../../validators/Login";
import api from "../../services/api";

import { ButtonPink, Button } from "../../components/Buttons";
import Input from "../../components/Inputs";
import { toast } from "react-toastify";
import RegisterMain from "../Register/style";
import { FormLogin } from "../../components/Form";
import logo from "../../img/logo.png"


const Login = ({ setAuthentication }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });
  const navigate = useNavigate();

  const loginUser = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("@token", response.data.token);
        localStorage.setItem("@id", response.data.user.id);
        navigate("/dashboard", { replace: true });
        toast.success("Usuário Logado");
        setAuthentication(true);
      })
      .catch((error) => {
        toast.error("Verifique as informações inseridas");
        console.log(error);
      });
  };

  return (
    <RegisterMain>
      <img src={ logo } alt="Logo KenzieHub" />

      <FormLogin onSubmit={handleSubmit(loginUser)}>
        <h1>Login</h1>
        <label>Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Digite aqui seu email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>

        <label>Senha</label>
        <Input
          type="password"
          id="password"
          placeholder="Digite aqui sua senha"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <ButtonPink>Entrar</ButtonPink>

        <p>Ainda não possui uma conta?</p>
        <Button onClick={() => navigate("/register", { replace: true })}>
          Cadastre-se
        </Button>
      </FormLogin>
    </RegisterMain>
  );
};

export default Login;
