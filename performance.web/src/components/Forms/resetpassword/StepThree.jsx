import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { PInputField, PSubmitButton } from "../..";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "A senha deve conter, pelo menos, 6 caracteres")
    .required("Campo obrigatório"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem corresponder")
    .required("Campo obrigatório"),
});

const initialValues = {
  password: "",
  confirmpassword: "",
};

const StepThree = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="flex flex-col items-center space-y-4">
          <PInputField
            name="password"
            type="password"
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            className="sm:w-64"
          />
          <PInputField
            name="confirmpassword"
            type="password"
            label="Confirme a Nova Senha"
            placeholder="Digite novamente a senha"
            className="sm:w-64"
          />
          <PSubmitButton
            disabled={!formik.isValid || formik.isSubmitting}
            buttonTitle={
              formik.isSubmitting ? "Carregando..." : "Redefinir Senha"
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default StepThree;
