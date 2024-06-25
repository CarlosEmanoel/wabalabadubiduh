import React from "react";

const NotFound = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 flex flex-col justify-center items-center text-red-600">
          <h2 className="font-semibold">Página Não Encontrada</h2>
        </div>
        <div className="col-md-6 flex justify-center pt-5">
          <img
            src={`${process.env.REACT_APP_NODE_URL}/image/blockpainel.jpg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default NotFound;
