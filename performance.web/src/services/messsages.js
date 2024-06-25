import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const messages = {
  mensagem: {
    sucesso: (msg) => {
      toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        transition: Flip,
      });
    },
    alerta: (msg) => {
      toast.info(msg, {
        position: "top-center",
        autoClose: 2000,
        transition: Flip,
      });
    },
    erro: (msg) => {
      toast.error(msg, {
        position: "top-center",
        autoClose: 2000,
        transition: Flip,
      });
    },
  },
};
export default messages;
