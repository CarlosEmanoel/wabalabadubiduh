import React, { useState, useEffect } from "react";
import { PSubmitButton } from "..";

export default function InputCodeVerify({
  blocks = 6,
  errorMessage,
  onComplete,
  onResend,
  resetTimer,
  label,
}) {
  const [code, setCode] = useState(Array(blocks).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (resetTimer) {
      setTimer(0);
    }
  }, [resetTimer]);

  const handleChange = (value, index) => {
    if (/[^0-9]/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== "" && index < blocks - 1) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index] !== "") {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text");
    if (/^\d+$/.test(pasteData) && pasteData.length === blocks) {
      const newCode = pasteData.split("");
      setCode(newCode);
    }
  };

  const handleCopy = (e) => {
    e.preventDefault();
    e.clipboardData.setData("Text", code.join(""));
  };

  const handleSubmit = () => {
    if (code.includes("")) {
      setError(true);
      setSuccess(false);
    } else {
      setError(false);
      setSuccess(true);
      onComplete(code.join(""));
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      onResend();
      setTimer(180);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 select-none">
      <label
        htmlFor="code-input-0"
        className="text-sm font-bold text-gray-600  flex items-center"
      >
        {label}
      </label>
      <div className="flex space-x-2">
        {code.map((value, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength="1"
            className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onCopy={handleCopy}
          />
        ))}
      </div>
      {error && (
        <p className="text-red-500">Por favor, preencha todos os blocos.</p>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <PSubmitButton onClick={handleSubmit} buttonTitle={"Verificar Código"} />
      <a
        onClick={handleResend}
        className={`decoration-inherit cursor-pointer ${
          timer > 0 ? "text-gray-600 cursor-progress" : "text-sky-500"
        }`}
        disabled={timer > 0}
      >
        {timer > 0 ? `Reenviar código em (${timer}s)` : "Reenviar Código"}
      </a>
    </div>
  );
}
