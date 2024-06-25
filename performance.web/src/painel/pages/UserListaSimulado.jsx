import React from "react";
import DataTable from "react-data-table-component";

import NewButton from "../../components/NewButton/NewButton";
import { PContent } from "../../components";

const UserListaSimulado = () => {
  return (
    <PContent>
      <NewButton path={"/user/usernovosimulado"} />
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
