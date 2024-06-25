import React, { useCallback, useEffect, useState } from "react";
import "./Courses.css";
import {
  PCarouselView,
  PDefaultContainer,
  PTabBarCard,
} from "../../components";
import api from "../../services/api";
import FirstSection from "./FirstSection/FirstSection";
import Subscribe from "../../components/Forms/Subscribe/Subscribe";

const COURSE_LEVELS = {
  0: "Dados do Curso",
  1: "Básico",
  2: "Intermediário",
  3: "Avançado",
};

const getNivelTitle = (nivel) => COURSE_LEVELS[nivel] || "Nível Desconhecido";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [initialValuesSubscribe, setInitialValuesSubscribe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await api.get(`/parse-cursos/`);
      const { data } = response.data;
      const transformedCourses = data.map((course) => ({
        id: course.id,
        tabs: [
          {
            id: course.id,
            tabTitle: "Dados Gerais",
            title: course.titulo,
            subtitle: course.subtitulo,
            description: `${course.endereco}, ${course.municipio}/${course.uf}`,
            image: `curso-${course.id}`,
          },
          ...course.niveis.map((nivel) => ({
            id: nivel.id,
            title: getNivelTitle(nivel.nivel),
            subtitle: nivel.publico_alvo,
            description: nivel.descricao,
            image: `curso-${course.id}`,
            href: `${course.id}/${nivel.id}`,
          })),
          {
            tabTitle: "Professores",
            title: "Professores",
            subTabs: course.professores.map((professor) => ({
              id: professor.professor_id,
              title: professor.professor.nome.split(" ")[0],
              subtitle: professor.professor.nome,
              description: professor.professor.curriculo,
              image: `professor-${professor.professor_id}`,
            })),
          },
        ],
      }));
      setCourses(transformedCourses);
      setLoading(false);
    } catch (error) {
      setError("Erro ao carregar os cursos");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onClick = useCallback((subscribe) => {
    setOpenModal(true);
    const [cursoId, nivelId] = subscribe.split("/");
    setInitialValuesSubscribe({
      nome: "",
      email: "",
      telefone: "",
      cnpj: "",
      cpf: "",
      unidadegestora: "",
      cargo: "",
      endereco: "",
      bairro: "",
      municipio: "",
      estado: "",
      cep: "",
      typeDocument: "",
      cursoId: cursoId,
      nivelId: nivelId,
    });
  }, []);

  const onClose = useCallback(() => {
    setOpenModal(false);
    setInitialValuesSubscribe({});
  }, []);

  // if (loading) {
  //   return <PDefaultContainer>Carregando...</PDefaultContainer>;
  // }

  // if (error) {
  //   return <PDefaultContainer>{error}</PDefaultContainer>;
  // }

  return (
    <PDefaultContainer>
      <FirstSection />
      <PCarouselView autoPlay indicator>
        {courses.map((course) => (
          <PTabBarCard
            key={course.id}
            buttonTitle="Inscreva-se"
            tabs={course.tabs}
            onClick={onClick}
          />
        ))}
      </PCarouselView>

      <Subscribe
        isOpen={openModal}
        onClose={onClose}
        initialValues={initialValuesSubscribe}
      />
    </PDefaultContainer>
  );
}

export default Courses;
