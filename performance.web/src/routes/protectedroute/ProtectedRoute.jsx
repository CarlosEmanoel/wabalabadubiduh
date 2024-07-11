import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import util from "../../services/util";

const ProtectedRoute = ({ isPublic, isAuthorized, acesso }) => {
  if (isPublic || isAuthorized) {
    // A rota é pública ou o usuário está autorizado a acessá-la
    if (acesso && acesso !== util.storage.getItem("t")) {
      // Redirecione o usuário para uma página de erro ou de acesso negado
      return <Navigate to="/acesso-negado" />;
    } else {
      return <Outlet />;
    }
  } else {
    // A rota não é pública e o usuário não está autorizado a acessá-la
    return <Navigate to="/acesso" />;
  }
};

export default ProtectedRoute;
