import React, { useReducer, useEffect } from "react";
import { useFormikContext } from "formik";
import api from "../../../services/api";
import { PDataTable, PDefaultModal } from "../../../components";

const initialState = {
  selectedTeachers: [],
  teachers: [],
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_TEACHERS":
      return { ...state, teachers: action.payload, loading: false };
    case "SET_SELECTED_TEACHERS":
      return { ...state, selectedTeachers: action.payload, loading: false };
    default:
      return state;
  }
}

const AddTeachersToCourseModal = ({ isOpen, onClose }) => {
  const { values, setFieldValue } = useFormikContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: "SET_LOADING", payload: true });
      api
        .get("/professores")
        .then((res) => {
          dispatch({ type: "SET_TEACHERS", payload: res.data.data });
          dispatch({
            type: "SET_SELECTED_TEACHERS",
            payload: values.selectedTeachers,
          });
        })
        .catch((error) => {
          console.error("Erro ao carregar professores", error);
          dispatch({ type: "SET_LOADING", payload: false });
        });
    }
  }, [isOpen]);

  const handleRowSelection = (selectedRows) => {
    dispatch({
      type: "SET_SELECTED_TEACHERS",
      payload: selectedRows,
    });
  };

  const handleCloseModal = () => {
    setFieldValue("selectedTeachers", state.selectedTeachers);
    onClose();
  };

  const columns = [
    {
      name: "PERFIL",
      dataIndex: "perfil",
      path: "public/images/professor-",
      type: "img",
      sortable: false,
      filterable: false,
      width: "30%",
    },
    {
      name: "NOME",
      dataIndex: "nome",
      type: "text",
      sortable: true,
      filterable: true,
    },
  ];

  return (
    <PDefaultModal isOpen={isOpen} onClose={onClose}>
      <div>
        <PDataTable
          title="Selecione os professores"
          columns={columns}
          data={state.teachers}
          rowKey="id"
          onSelectRow={handleRowSelection}
          selectedDefault={state.selectedTeachers}
          selectable={true}
        />
      </div>
      <div className="flex justify-center mt-4 border-t-2 border-gray-200 pt-4">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCloseModal}
        >
          Salvar Seleção
        </button>
      </div>
    </PDefaultModal>
  );
};

export default AddTeachersToCourseModal;
