import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { PCarouselView, PCourseCard, PDefaultContainer, PSectionContainer, PSubscribe } from "../../components";
import FirstSection from "./FirstSection/FirstSection";
import "./Courses.css";

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

  const fetchCourses = useCallback(async () => {
    try {
      const response = await api.get(`/parse-cursos/`);
      const { data } = response.data;
      const transformedCourses = data.map((course) => {
        const niveis = course.niveis.map((nivel) => ({
          id: nivel.id,
          level: nivel.nivel,
          tabTitle: getNivelTitle(nivel.nivel),
          targetAudience: {
            accordionTitle: "Público Alvo",
            targetAudience: nivel.publico_alvo,
          },
          content: {
            accordionTitle: `Conteúdo - Nível ${getNivelTitle(nivel.nivel)}`,
            content: nivel.conteudo,
          },
          description: {
            accordionTitle: `Descrição - Nível ${getNivelTitle(nivel.nivel)}`,
            description: nivel.descricao,
          },
          value: nivel.valor,
          oldValue: nivel.oldValue,
        }));

        const professores = course.professores.map((professorAssoc) => ({
          id: professorAssoc.professor.id,
          accordionTitle: "Currículo do Professor",
          tabTitle: professorAssoc.professor.nome.split(' ')[0],
          teacherName: professorAssoc.professor.nome,
          teacherCurriculum: professorAssoc.professor.curriculo,
        }));

        return {
          id: course.id,
          isActive: course.is_active,
          courseTitle: course.titulo,
          couseSubtitle: course.subtitulo,
          courseDescription: course.niveis[0].descricao,
          courseUf: course.uf,
          courseCity: course.municipio,
          courseAddress: course.endereco,
          courseStart: course.data_inicio,
          courseEnd: course.data_fim,
          courseLevels: niveis,
          courseTeachers: professores,
          dropdownMenu: [
            {
              value: 1,
              label: "Conteúdo do Curso"
            },
            {
              value: 2,
              label: "Professores"
            }
          ],
        };
      });
      setCourses(transformedCourses);
    } catch (error) {
      console.log("Erro ao carregar os cursos: ", error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onClick = useCallback((course, levels) => {
    setOpenModal(true);
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
      curso: course,
      cursoId: course.id,
      nivelId: "",
      levels
    });
  }, []);

  const onClose = useCallback(() => {
    setOpenModal(false);
    setInitialValuesSubscribe({});
  }, []);

  return (
    <PDefaultContainer>
      <FirstSection />
      <PCarouselView className="w-full mx-auto"  autoPlayInterval={5000}>
        {courses.map((course) => (
          <div className="py-4 flex w-full justify-center items-center">
            <PCourseCard
              key={course.id}
              buttonTitle="Inscreva-se"
              data={course}
              onClick={() => onClick(course, course.courseLevels)}
            />
          </div>
        ))}
      </PCarouselView>

      <PSubscribe
        isOpen={openModal}
        onClose={onClose}
        initialValues={initialValuesSubscribe}
      />
    </PDefaultContainer>
  );
}

export default Courses;
