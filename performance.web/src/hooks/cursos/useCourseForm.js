import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import messages from "../../services/messsages";
import util from "../../services/util";
import useFileUpload from "../uploads/useFileUpload";

const useCourseFormHook = () => {
  const { id } = useParams();
  const fileUpload = useFileUpload();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    titulo: "",
    subtitulo: "",
    uf: "",
    municipio: "",
    endereco: "",
    dataInicio: "",
    dataFim: "",
    isActive: "",
    isNotNivel: false,
    isBasic: false,
    isIntermediary: false,
    isAdvanced: false,
    notNivelForm: {},
    basicForm: {},
    intermediaryForm: {},
    advancedForm: {},
    selectedTeachers: [],
    selectedFile: {},
  });

  useEffect(() => {
    if (id) {
      api.get(`/curso/${id}`).then((response) => {
        const { data } = response.data;
        const niveis = data.niveis.reduce((acc, cur) => {
          const formKey = [
            "notNivelForm",
            "basicForm",
            "intermediaryForm",
            "advancedForm",
          ][cur.nivel];
          acc[formKey] = {
            ...cur,
            valor: util.formatMoney(cur.valor),
            publicoAlvo: cur.publico_alvo,
          };
          return acc;
        }, {});
        setFormValues({
          ...data,
          dataInicio: data.data_inicio.split("T")[0],
          dataFim: data.data_fim.split("T")[0],
          isActive: data.is_active,
          isNotNivel: !!niveis.notNivelForm,
          isBasic: !!niveis.basicForm,
          isIntermediary: !!niveis.intermediaryForm,
          isAdvanced: !!niveis.advancedForm,
          notNivelForm: niveis.notNivelForm || {},
          basicForm: niveis.basicForm || {},
          intermediaryForm: niveis.intermediaryForm || {},
          advancedForm: niveis.advancedForm || {},
          selectedTeachers: data.professores.map((p) => p.professor_id),
          selectedFile: {},
        });
      });
    }
  }, [id]);

  const onSubmit = async (values, actions) => {
    const listaNiveis = [
      { key: "isNotNivel", form: "notNivelForm", nivel: 0 },
      { key: "isBasic", form: "basicForm", nivel: 1 },
      { key: "isIntermediary", form: "intermediaryForm", nivel: 2 },
      { key: "isAdvanced", form: "advancedForm", nivel: 3 },
    ];

    const niveis = listaNiveis
      .filter((nivel) => values[nivel.key])
      .map((nivel) => ({
        ...values[nivel.form],
        nivel: nivel.nivel,
        valor: util.formatBD(values[nivel.form].valor),
      }));

    try {
      const formattedData = {
        ...values,
        niveis,
        professores: values.selectedTeachers,
      };
      const response = await (id
        ? api.patch(`/curso/${id}`, formattedData)
        : api.post("/curso", formattedData));
      if (response.status === 201) {
        if (values.selectedFile.name)
          await fileUpload("curso", response.data.data.id, values.selectedFile);
        messages.mensagem.sucesso(
          `Curso ${id ? "editado" : "cadastrado"} com sucesso!`
        );
        navigate("/painel/listacursos");
      } else {
        throw new Error("Algo deu errado ao tentar cadastrar o curso.");
      }
    } catch (error) {
      messages.mensagem.erro(
        error.message || "Erro ao processar a requisição."
      );
      actions.setSubmitting(false);
    }
  };

  return {
    formValues,
    onSubmit,
  };
};

export default useCourseFormHook;
