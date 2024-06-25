import React from "react";
import { useNavigate } from "react-router-dom";
import util from "../../services/util";

const NewButton = ({ path }) => {
  const navigate = useNavigate();
  function novo() {
    navigate(util.getEnv() + path);
  }

  return (
    <button className="flex justify-center items-center py-2 px-8 bg-green-700 text-white rounded-lg self-end" onClick={novo}>
      <strong>Novo</strong>
    </button>
  );
};

export default NewButton;
