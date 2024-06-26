import { useState } from "react";
import api from "../../services/api";

const useSendMailHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (emailData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/send-email", emailData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response ? err.response.data : "Erro ao enviar e-mail");
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error, success };
};

export default useSendMailHook;
