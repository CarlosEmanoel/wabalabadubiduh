import { useFormik } from "formik";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import messages from "../../services/messsages";
import { PContent } from "../../components";

function PainelQuestionario() {
  const { id, page } = useParams();
  const initialFormState = {
    id: 0,
    questaoId: 0,
    letra: "",
    resposta: "",
    nivel: 0,
    tipo: 0,
  };

  const [listaAlternativas, setListaAlternativas] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const navigate = useNavigate();
  
  const [nivelSelecionado, setNivelSelecionado] = useState(0);
  const [tipoSelecionado, setTipoSelecionado] = useState(0);
  const [conteudo, setConteudo] = useState("");

  const carregar = () => {
    if (id) {
      api.get("/questao/" + id).then((response) => {
        let data = {
          id: response.data.data.id,
          pergunta: response.data.data.pergunta,
          letra: response.data.data.letra,
          resposta: response.data.data.resposta,
          respostacorreta: response.data.data.respostacorreta,
          respostacomentada: response.data.data.respostacomentada,
          nivel: response.data.data.nivel,
          tipo: response.data.data.tipo,
        };
        setConteudo(response.data.data.pergunta);
        formik.values.pergunta = response.data.data.pergunta;
        formik.values.respostacorreta = response.data.data.respostacorreta;
        formik.values.respostacomentada = response.data.data.respostacomentada;
        formik.values.nivel = response.data.data.nivel;
        formik.values.tipo = response.data.data.tipo;
        setForm(data);
        setListaAlternativas(response.data.data.alternativas);
        setNivelSelecionado(response.data.data.nivel);
        setTipoSelecionado(response.data.data.tipo);
      });
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const formik = useFormik({
    onSubmit: async (data, { resetForm }) => {
      data.nivel = formik.values.nivel;
      data.tipo = formik.values.tipo;
      data.alternativas = listaAlternativas;
      if (!id) {
        api.post("/questao", data).then((response) => {
          setListaAlternativas([]);
          setForm(initialFormState);
          formik.values = {
            pergunta: "",
            respostacorreta: "",
            respostacomentada: "",
            alternativas: [],
            nivel: 0,
            tipo: 0,
          };
          messages.mensagem.sucesso("Cadastrado com sucesso!");
          resetForm({
            values: {
              pergunta: "",
              respostacorreta: "",
              respostacomentada: "",
              alternativas: [],
              nivel: 0,
              tipo: 0,
            },
          });
        });
      } else {
        data.id = id;
        api.patch("/questao", data).then((response) => {
          setListaAlternativas([]);
          setForm(initialFormState);
          formik.values = {
            pergunta: "",
            respostacorreta: "",
            respostacomentada: "",
            alternativas: [],
            nivel: 0,
            tipo: 0,
          };

          if (response.data.success === true) {
            messages.mensagem.sucesso(response.data.message);
            carregar();
          } else {
            messages.mensagem.erro(response.data.message);
          }
        });
      }
      setConteudo("")
    },
    initialValues: {
      pergunta: "",
      respostacorreta: "",
      respostacomentada: "",
      alternativas: [],
      nivel: 0,
      tipo: 0,
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "letra") {
      setForm({
        ...form,
        letra: value,
      });
    }

    if (name === "resposta") {
      setForm({
        ...form,
        resposta: value,
      });
    }

    if (name === "nivel") {
      setForm({
        ...form,
        nivel: value,
      });
    }
  };

  const handleNivelChange = (e) => {
    const { value } = e.target;
    setNivelSelecionado(Number(value));
    formik.setFieldValue("nivel", Number(value));
  };

  const handleTipoChange = (e) => {
    const { value } = e.target;
    setTipoSelecionado(Number(value));
    formik.setFieldValue("tipo", Number(value));
  };

  const addAlternativa = () => {
    const alternativa = {
      id: 0,
      letra: form.letra,
      resposta: form.resposta,
      questaoId: form.id,
      nivel: form.nivel,
    };

    setListaAlternativas([...listaAlternativas, alternativa]);
    setForm({
      id: form.id,
      letra: "",
      resposta: "",
      questaoId: 0,
      nivel: 0,
      tipo: 0,
    });
  };

  const removeAlternativa = (index) => {
    const newAlternativas = [...listaAlternativas];
    newAlternativas.splice(index, 1);
    setListaAlternativas(newAlternativas);
  };

  const editor = useRef(null);

  const handleText = (conteudo) => {
    formik.values.pergunta = conteudo;
    setConteudo(conteudo);
  };

  const voltar = () => {
    let pagina = page ? page : 1;
    navigate("/painel/questoes/" + pagina);
  };

  const [config] = useState({
    placeholder: "Digite a pergunta...",
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
  });

  return (
    <PContent>
      <div className="ml-4 mt-4">
        <div>
          <h3>Inserir questões</h3>

          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <div>
              <div className="mt-3">
                <label className="font-medium" htmlFor="pergunta">
                  Pergunta
                </label>
                <JoditEditor
                  config={config}
                  ref={editor}
                  value={conteudo}
                  tabIndex={1}
                  onBlur={(newContent) => handleText(newContent)}
                  onChange={(newContent) => {}}
                />
              </div>
              <div className="mt-4">
                <label className="font-medium" htmlFor="letra">
                  Alternativa da Questão
                </label>
                <select
                  className="form-select"
                  name="letra"
                  placeholder="Digite letra"
                  value={form.letra}
                  onChange={handleInputChange}
                >
                  <option selected>Letra</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="font-medium" htmlFor="resposta">
                  Resposta da Alternativa
                </label>
                <textarea
                  className="form-control"
                  type="text"
                  name="resposta"
                  placeholder="Digite resposta"
                  value={form.resposta}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <label className="font-medium" htmlFor="respostacorreta">
                  Alternativa Gabarito
                </label>
                <select
                  className="form-select"
                  name="respostacorreta"
                  placeholder="Digite letra correta"
                  value={formik.values.respostacorreta}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option selected>Letra Gabarito</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="font-medium" htmlFor="respostacomentada">
                  {" "}
                  Resposta Gabarito
                </label>
                <textarea
                  className="form-control h-40"
                  type="text"
                  name="respostacomentada"
                  placeholder="Digite resposta gabarito"
                  value={formik.values.respostacomentada}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="mt-4">
              <div dangerouslySetInnerHTML={{ __html: conteudo }} />
            </div>

            {listaAlternativas.length > 0 && (
              <div>
                {listaAlternativas.map((item, index) => (
                  <div key={item.letra}>
                    {item.letra} - {item.resposta}
                    <button
                      className="bg-gray-300 text-blue-700 font-semibold py-2 px-4 ms-5 mt-3 rounded"
                      onClick={() => removeAlternativa(index)}
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <strong>Resposta do Gabarito</strong>
              <br />
              {formik.values.respostacorreta} -{" "}
              {formik.values.respostacomentada}
            </div>
            <div style={{ flexDirection: "row", display: "flex" }}>
              <div className="mt-4 mr-2">
                <label className="font-medium" htmlFor="nivel">
                  Nível da Questão
                </label>
                <select
                  className="form-select"
                  name="nivel"
                  value={formik.values.nivel}
                  onChange={handleNivelChange}
                  onBlur={formik.handleBlur}
                >
                  <option disabled value={0}>
                    Selecione o Nível da Questão
                  </option>
                  <option value={1}>Básica</option>
                  <option value={2}>Intermediária</option>
                  <option value={3}>Avançada</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="font-medium" htmlFor="tipo">
                  Tipo da Questão
                </label>
                <select
                  className="form-select"
                  name="tipo"
                  value={formik.values.tipo}
                  onChange={handleTipoChange}
                  onBlur={formik.handleBlur}
                >
                  <option disabled value={0}>
                    Selecione o Tipo da Questão
                  </option>
                  <option value={1}>Dirigentes e Conselheiros</option>
                  <option value={2}>Finanças</option>
                </select>
              </div>
            </div>
            {nivelSelecionado === 0 ||
              (tipoSelecionado === 0 && (
                <div style={{ color: "red" }}>
                  Você precisa selecionar um nível para habilitar o botão
                  "Salvar".
                </div>
              ))}

            <div className="flex justify-center mt-4 mb-5 space-x-4">
              <button
                className="bg-sky-600 w-24 p-2 text-gray-200 font-semibold text-lg rounded me-2"
                type="button"
                onClick={addAlternativa}
              >
                Adicionar
              </button>

              <button
                className={
                  formik.values.nivel === 0 || formik.values.tipo === 0
                    ? "bg-gray-600 w-24 rounded text-gray-200 font-semibold text-lg"
                    : "bg-green-600 w-24 rounded text-gray-200 font-semibold text-lg"
                }
                type="submit"
                disabled={formik.values.nivel === 0 || formik.values.tipo === 0}
              >
                Salvar
              </button>

              <button
                className="bg-gray-500 w-24 rounded text-gray-200 font-semibold text-lg"
                type="button"
                onClick={voltar}
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
    </PContent>
  );
}
export default PainelQuestionario;
