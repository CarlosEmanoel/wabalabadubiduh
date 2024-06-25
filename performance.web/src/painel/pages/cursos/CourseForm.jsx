import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { mainValidation } from "./validationSchemas";
import CourseContent from "./CourseContent";
import NivelForm from "./NivelForm";
import AddTeachersToCourseModal from "./AddTeacherToCourseModal";
import "react-toastify/dist/ReactToastify.css";
import { useCourseForm } from "../../../hooks";
import { PContent } from "../../../components";

const CourseForm = () => {
  const { formValues, onSubmit } = useCourseForm();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const niveis = [
    { key: "isNotNivel", nivel: "notNivelForm" },
    { key: "isBasic", nivel: "basicForm", title: "Básico" },
    {
      key: "isIntermediary",
      nivel: "intermediaryForm",
      title: "Intermediário",
    },
    { key: "isAdvanced", nivel: "advancedForm", title: "Avançado" },
  ];

  return (
    <PContent>
      <Formik
        initialValues={formValues}
        validationSchema={mainValidation}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(formik) => (
          <>
            <Form>
              <div className="container mx-auto p-4">
                <CourseContent />
                {(formik.values.isNotNivel ||
                  formik.values.isBasic ||
                  formik.values.isIntermediary ||
                  formik.values.isAdvanced) && (
                  <div className="w-full px-2 mb-4 rounded-lg border border-slate-400">
                    <h2 className="text-xl font-semibold text-gray-700 py-2 text-center border-solid border-b-2 border-gray-200">
                      Dados Complementares
                    </h2>
                    {niveis.map(
                      (nivel) =>
                        formik.values[nivel.key] && (
                          <NivelForm
                            key={nivel.key}
                            nivel={nivel.nivel}
                            title={nivel.title}
                          />
                        )
                    )}
                  </div>
                )}
                <div className="flex mt-4">
                  <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                  >
                    Adicionar Professores
                  </button>
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400 focus:outline-none"
                    onClick={() => navigate("/painel/listacursos")}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none disabled:bg-green-200"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Carregando..." : "Salvar"}
                  </button>
                </div>
              </div>
            </Form>
            {openModal && (
              <AddTeachersToCourseModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
              />
            )}
          </>
        )}
      </Formik>
    </PContent>
  );
};

export default CourseForm;
