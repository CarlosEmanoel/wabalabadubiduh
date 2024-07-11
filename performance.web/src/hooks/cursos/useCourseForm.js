import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import messages from "../../services/messages";
import util from "../../services/util";
import useFileUpload from "../uploads/useFileUpload";

const LEVEL_KEYS = [
  "notNivelForm",
  "basicForm",
  "intermediaryForm",
  "advancedForm",
];

const formatDataFromApi = (data) => {
  const levels = data.niveis.reduce((acc, cur) => {
    const formKey = LEVEL_KEYS[cur.nivel];
    acc[formKey] = {
      ...cur,
      valor: util.formatMoney(cur.valor),
      publicoAlvo: cur.publico_alvo,
    };
    return acc;
  }, {});

  return {
    ...data,
    dataInicio: data.data_inicio.split("T")[0],
    dataFim: data.data_fim.split("T")[0],
    isActive: data.is_active,
    isNotNivel: !!levels.notNivelForm,
    isBasic: !!levels.basicForm,
    isIntermediary: !!levels.intermediaryForm,
    isAdvanced: !!levels.advancedForm,
    notNivelForm: levels.notNivelForm || {},
    basicForm: levels.basicForm || {},
    intermediaryForm: levels.intermediaryForm || {},
    advancedForm: levels.advancedForm || {},
    selectedTeachers: data.professores.map((p) => p.professor_id),
    selectedFile: {},
  };
};

const formatDataForSubmission = (values) => {
  const levelsList = [
    { key: "isNotNivel", form: "notNivelForm", nivel: 0 },
    { key: "isBasic", form: "basicForm", nivel: 1 },
    { key: "isIntermediary", form: "intermediaryForm", nivel: 2 },
    { key: "isAdvanced", form: "advancedForm", nivel: 3 },
  ];

  const levels = levelsList
    .filter((level) => values[level.key])
    .map((level) => ({
      ...values[level.form],
      nivel: level.nivel,
      valor: util.formatBD(values[level.form].valor),
    }));

  return {
    ...values,
    niveis: levels,
    professores: values.selectedTeachers,
  };
};

const useCourseFormHook = () => {
  const { id } = useParams();
  const fileUpload = useFileUpload();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    titulo: "",
    subtitulo: "",
    descricao: "",
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
      api
        .get(`/curso/${id}`)
        .then((response) => {
          const { data } = response.data;
          setFormValues(formatDataFromApi(data));
        })
        .catch((error) => {
          messages.mensagem.erro("Erro ao buscar dados do curso.");
        });
    }
  }, [id]);

  const onSubmit = async (values, actions) => {
    try {
      const formattedData = formatDataForSubmission(values);
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
        throw new Error("Erro inesperado ao tentar cadastrar o curso.");
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
