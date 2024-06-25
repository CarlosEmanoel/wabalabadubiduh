import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container pt-5">
      <div className="flex flex-col justify-center items-center my-5">
        <h1 className="my-3 text-blue-900">Bem-vindo a Central do Aluno!</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-auto h-auto ml-10"
          src={`${process.env.REACT_APP_NODE_URL}/image/userdashboard.png`}
          alt=""
        />
      </div>
    </div>
  );
};
export default UserDashboard;
