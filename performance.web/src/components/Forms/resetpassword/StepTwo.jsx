import React from "react";
import { PInputCodeVerify } from "../..";

const StepTwo = ({ verifyToken, requestToken }) => {
  return (
    <PInputCodeVerify
      blocks={6}
      onComplete={verifyToken}
      onResend={requestToken}
      label={"Digite o Token:"}
    />
  );
};

export default StepTwo;
