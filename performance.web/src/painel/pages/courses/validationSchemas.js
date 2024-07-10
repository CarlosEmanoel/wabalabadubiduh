import * as yup from "yup";

export const nivelValidation = yup.object({
  publicoAlvo: yup.string().required("Campo obrigatório"),
  conteudo: yup
    .string()
    .required("Campo obrigatório")
    .test(
      "is-editor-empty",
      "Campo obrigatório",
      (value) => value !== "<p><br></p>"
    ),
  descricao: yup.string().required("Campo obrigatório"),
});

export const mainValidation = yup.object().shape({
  titulo: yup.string().required("Campo obrigatório"),
  descricao: yup.string().required("Campo obrigatório"),
  uf: yup.string().required("Campo obrigatório"),
  municipio: yup.string().required("Campo obrigatório"),
  endereco: yup.string().required("Campo obrigatório"),
  dataInicio: yup
    .date()
    .required("Campo obrigatório")
    .max(
      yup.ref("dataFim"),
      "A data de início não pode ser posterior à data de fim"
    ),
  dataFim: yup
    .date()
    .required("Campo obrigatório")
    .min(
      yup.ref("dataInicio"),
      "A data de fim não pode ser anterior à data de início"
    ),
  isActive: yup.boolean().required("Campo obrigatório"),
  isNotNivel: yup.boolean(),
  isBasic: yup.boolean(),
  isIntermediary: yup.boolean(),
  isAdvanced: yup.boolean(),
  levelSelected: yup
    .boolean()
    .test(
      "at-least-one",
      "Selecione ao menos uma opção para o nível do curso",
      function () {
        return (
          this.parent.isNotNivel ||
          this.parent.isBasic ||
          this.parent.isIntermediary ||
          this.parent.isAdvanced
        );
      }
    ),
  notNivelForm: yup.lazy((values, { parent }) =>
    parent.isNotNivel ? nivelValidation : yup.mixed().notRequired()
  ),
  basicForm: yup.lazy((values, { parent }) =>
    parent.isBasic ? nivelValidation : yup.mixed().notRequired()
  ),
  intermediaryForm: yup.lazy((values, { parent }) =>
    parent.isIntermediary ? nivelValidation : yup.mixed().notRequired()
  ),
  advancedForm: yup.lazy((values, { parent }) =>
    parent.isAdvanced ? nivelValidation : yup.mixed().notRequired()
  ),
});
