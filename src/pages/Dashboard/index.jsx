import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Exit } from "../../components/Buttons";
import logo from "../../img/logo.png";
import api from "../../services/api";
import { DashHeader, DashMain, Profile } from "./style";

const Dashboard = ({ setAuthentication }) => {
  const [loged, setLoged] = useState([]);
  const id = localStorage.getItem("@id");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/users${id}`)
      .then((responde) => setLoged(responde.data))
      .catch((err) => console.log(err))
  }, [navigate, id]);

  const logOut = () => {
    localStorage.removeItem("@token")
    localStorage.removeItem("@id")
    setAuthentication(false)
    navigate("/", { replace: true })
  }

  console.log(loged)

  return (
    <DashMain>
        <DashHeader>
            <img src={logo} alt="Logo KenzieHub" className="logo"/>
            <Exit onClick={() => logOut()}>Sair</Exit>
        </DashHeader>

        <hr />

        <Profile>
            <h1>Olá, { loged.name } </h1>
            <h2>{ loged.module }</h2>
        </Profile>

        <hr />

        <div>
            <h1>Que pena, estamo em manutencao :(</h1>
            <p>Nossa aplicacao esta em desenvolvimento, em breve teremos novidades</p>
        </div>
    </DashMain>
  );
};

export default Dashboard;
