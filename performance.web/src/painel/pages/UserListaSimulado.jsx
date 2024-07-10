import React from "react";
import DataTable from "react-data-table-component";

import { PContent, PNewButton } from "../../components";

const UserListaSimulado = () => {
  return (
    <PContent>
      <PNewButton path={"/user/usernovosimulado"} />
      <DataTable
        className="border-collapse border border-slate-400"
        title="LISTA DE SIMULADO"
        pagination
        highlightOnHover
      />
    </PContent>
  );
};

export default UserListaSimulado;
