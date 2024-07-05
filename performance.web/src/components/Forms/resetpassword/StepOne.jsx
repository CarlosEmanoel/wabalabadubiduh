import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { PInputField, PSubmitButton } from "../..";

const validationSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
});

const StepOne = ({ onSubmit, initialEmail }) => {
  return (
    <Formik
      initialValues={{ email: initialEmail }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="flex flex-col items-center space-y-4">
          <PInputField
            name="email"
            label="Seu E-mail"
            placeholder="Digite seu e-mail"
            className="sm:w-64"
          />
          <PSubmitButton
            disabled={!formik.isValid || formik.isSubmitting}
            buttonTitle={
              formik.isSubmitting ? "Solicitando..." : "Solicitar Token"
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;
