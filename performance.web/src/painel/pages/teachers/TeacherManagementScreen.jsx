import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { PContent, PDataTable, PDefaultModal, PSubmitButton } from "../../../components";
import TeacherForm from "./managers/TeacherForm";
import { Form, Formik } from "formik";
import { useFileUpload } from "../../../hooks";
import { BsPencil, BsTrash } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";

/**
 * Tela para gerenciamento de professores, incluindo listagem, adição, edição e exclusão.
 * @returns {JSX.Element} O componente React que renderiza a tela de gerenciamento de professores.
*/

const initialValues = {
    id: "",
    nome: "",
    curriculo: "",
    file: {}
}

const TeacherManagementScreen = () => {
    const [teachers, setTeachers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);

    const fileUpload = useFileUpload();

    // Carrega a lista de professores da API ao iniciar o componente
    useEffect(() => {
        loadTeachers();
    }, []);

    /**
     * Abre o modal de formulário para adicionar ou editar um professor.
     * @param {Object|null} teacher O professor a ser editado, ou null para um novo professor.
     */
    const openModal = (teacher = null) => {
        setCurrentTeacher(teacher);
        setTimeout(() => {
            console.log("oi")
            setIsOpen(true)
        }, 150)
    };
    // Fecha o modal de formulário
    const onClose = () => {
        setIsOpen(false);
        console.log("era pra ser false")
        setCurrentTeacher(null);
    };

    /**
     * Adiciona ou edita um professor na API.
     * @async
     * @param {string} id O ID do professor para edição, ou null para adição.
     * @param {Object} teacherData Os dados do professor para salvar.
     * @param {File} file O arquivo do professor, se houver.
     * @returns {Promise<Object>} Os dados do professor após salvar.
     */
    const handleAddOrEditTeacher = async (values, { resetForm }) => {
        const apiPath = values.id ? `/professor/${values.id}` : "/professor";
        const method = values.id ? "patch" : "post";
        try {
            const response = await api[method](apiPath, values);
            if (values.file.name)
                await fileUpload("professor", response.data.data.id, values.file);
            loadTeachers();
            resetForm();
            setIsOpen(false);
            return response.data.data;
        } catch (error) {
            console.error("Erro ao salvar o professor:", error);
        }
    };

    /**
     * Carrega a lista de professores da API.
     * @async
     */
    const loadTeachers = async () => {
        try {
            const response = await api.get("/professores");
            const teacherData = response.data.data;

            setTeachers(teacherData);
        } catch (error) {
            console.error("Erro ao carregar professores:", error);
        }
    };

    const columns = [
        {
            name: "PERFIL",
            dataIndex: "perfil",
            path: "public/images/professor-",
            type: "img",
            sortable: false,
            filterable: false,
            width: "20%",
        },
        {
            name: "NOME",
            dataIndex: "nome",
            type: "text",
            sortable: true,
            filterable: true,
            width: "20%"
        },
        {
            name: "CURRÍCULO",
            dataIndex: "curriculo",
            type: "text",
            lineClamp: true,
            sortable: true,
            filterable: true,
            width: "40%",
        },
        {
            name: "AÇÕES",
            dataIndex: "actions",
            type: "text",
            sortable: false,
            filterable: false,
            width: '20%',
            cell: (row) => (
                <div className="flex justify-center items-center">
                    <button
                        onClick={() =>
                            openModal(row)
                        }
                        className="cursor-pointer border-solid border-2 border-sky-200/[.55] hover:bg-sky-200 rounded-md w-11 h-9 mr-1.5 flex justify-center items-center"
                    >
                        <BsPencil color="blue" />
                    </button>
                    <button
                        onClick={() => confirmExclusion(row.id)}
                        className="cursor-pointer border-solid border-2 border-red-200/[.55] hover:bg-red-200 rounded-md w-11 h-9 flex justify-center items-center">
                        <BsTrash color="red" />
                    </button>
                </div>
            ),
        },
    ];

    const confirmExclusion = (id) => {
        confirmAlert({
            title: "Confirmação",
            message: "Tem certeza que deseja excluir?",
            overlayClassName: "bg-gray-800 bg-opacity-75",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => handleDeleteTeacher(id),
                },
                {
                    label: "Não",
                    onClick: () => { },
                },
            ],
        });
    };

    /**
        * Exclui um professor através da API.
        * @async
        * @param {string} id O ID do professor a ser excluído.
    */
    const handleDeleteTeacher = async (id) => {
        try {
            await api.delete(`/professor/${id}`);
            loadTeachers();
        } catch (error) {
            console.error("Erro ao deletar o professor:", error);
        }
    };

    return (
        <PContent>
            <div className="mx-auto mt-8">
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal()}
                    >
                        Adicionar Professor
                    </button>
                </div>
                <PDataTable
                    title="Lista de Professores"
                    columns={columns}
                    data={teachers}
                    rowKey="id"
                />
                <Formik
                    onSubmit={handleAddOrEditTeacher}
                    initialValues={currentTeacher || initialValues}
                    enableReinitialize
                >
                    {() => (
                        <Form>
                            <PDefaultModal
                                isOpen={isOpen}
                                onClose={() => onClose()}
                                title={"Professores"}
                                footer={
                                    <PSubmitButton
                                        buttonTitle="Salvar"
                                        className="w-[25%]"
                                        type="submit"
                                    />
                                }
                            >
                                <TeacherForm />
                            </PDefaultModal>
                        </Form>
                    )}
                </Formik>
            </div>
        </PContent>
    );
};

export default TeacherManagementScreen;