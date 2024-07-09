import React from "react";
import { PInputCodeVerify } from "../..";

const StepTwo = ({ verifyToken, requestToken, timer }) => {
  return (
    <PInputCodeVerify
      blocks={6}
      onComplete={verifyToken}
      onResend={requestToken}
      label={"Digite o Token:"}
      timer={timer}
    />
  );
};

export default StepTwo;
