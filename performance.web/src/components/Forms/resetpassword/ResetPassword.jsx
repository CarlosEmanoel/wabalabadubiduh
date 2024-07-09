import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import api from "../../../services/api";
import messages from "../../../services/messages";
import { PSuccessModal } from "../..";
import { useSendMail } from "../../../hooks";
import { passTokenText } from "../../../lib/texts/emails/mailTexts";

const ResetPassword = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [successModal, setSuccessModal] = useState(false);

  const { sendEmail } = useSendMail();

  async function sendResponse(email, token) {
    const clientConfirm = {
      subject: "Redefinição de Senha",
      body: passTokenText(token),
      from: "auth.performance@performance.goiania.br",
      to: email,
    };

    await sendEmail(clientConfirm);
  }

  const requestToken = async (values) => {
    if (!email) setEmail(values.email);
    try {
      const response = await api.post(`/forgot-password`, { email: values.email });

      const { token } = response.data;
      setTimer(180);
      setStep(2);

      sendResponse(values.email, token)

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      messages.mensagem.erro(
        error.response
          ? error.response.data.error
          : "Ocorreu um erro ao solicitar o token!"
      );
    }
  };

  const handleRequestToken = async () => {
    requestToken({ email });
  };

  const verifyToken = async (token) => {
    try {
      await api.post(`/verify-token`, { email, token });
      setStep(3);
    } catch (error) {
      console.log(error);
      messages.mensagem.erro(
        error.response
          ? error.response.data.error
          : "Ocorreu um erro ao verificar o token!"
      );
    }
  };

  const handleSubmitPassword = async (values) => {
    try {
      await api.post("/reset-password", {
        token: values.token,
        newPassword: values.password,
      });
      setSuccessModal(true);
    } catch (error) {
      console.log(error);
      messages.mensagem.erro(
        error.response
          ? error.response.data.error
          : "Ocorreu um erro ao redefinir a senha!"
      );
    }
  };

  const renderStepIndicator = (currentStep, stepNumber, label, shortLabel) => {
    return (
      <div className="flex items-center">
        {currentStep > stepNumber ? (
          <svg
            className="w-6 h-6 rounded-full bg-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
              className="path-check"
              stroke="white"
            />
          </svg>
        ) : (
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full border ${currentStep === stepNumber
              ? "border-blue-600 text-blue-600"
              : "border-gray-400 text-gray-400"
              }`}
          >
            {stepNumber}
          </div>
        )}
        <span
          className={`ml-2 ${currentStep >= stepNumber ? "text-blue-600" : "text-gray-400"
            }`}
        >
          <span className="hidden sm:block md:hidden">{shortLabel}</span>
          <span className="hidden md:block">{label}</span>
        </span>
      </div>
    );
  };

  useEffect(() => {
    if (!successModal && step === 3) onSuccess();
  }, [successModal]);

  return (
    <div className="select-none">
      <h2 className="text-lg md:text-xl lg:text-2xl text-center font-bold mb-6">
        Redefinição de Senha
      </h2>
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-4">
          {renderStepIndicator(step, 1, "Solicitação de Token", "Solicitação")}
          <div
            className={`border-t-2 w-8 ${step > 1 ? "border-blue-400" : ""}`}
          />
          {renderStepIndicator(step, 2, "Verificação de Token", "Verificação")}
          <div
            className={`border-t-2 w-8 ${step > 2 ? "border-blue-400" : ""}`}
          />
          {renderStepIndicator(step, 3, "Nova Senha", "Nova Senha")}
        </div>
      </div>

      {step === 1 && <StepOne onSubmit={requestToken} initialEmail={email} />}
      {step === 2 && (
        <StepTwo timer={timer} verifyToken={verifyToken} requestToken={handleRequestToken} />
      )}
      {step === 3 && <StepThree onSubmit={handleSubmitPassword} />}
      <PSuccessModal
        isOpen={successModal}
        setIsOpen={setSuccessModal}
        title="Senha redefinida com sucesso!"
        message="Sua senha foi redefinida com sucesso. Você já pode utilizar a nova senha para acessar sua conta."
        autoCloseTime={4000}
      />
    </div>
  );
};

export default ResetPassword;
