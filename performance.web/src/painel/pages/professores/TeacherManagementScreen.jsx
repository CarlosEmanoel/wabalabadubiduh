import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import TeacherFormModal from "./managers/TeacherFormModal";
import TeacherList from "./managers/TeacherList";
import { PContent } from "../../../components";

/**
 * Tela para gerenciamento de professores, incluindo listagem, adição, edição e exclusão.
 * @returns {JSX.Element} O componente React que renderiza a tela de gerenciamento de professores.
 */

const TeacherManagementScreen = () => {
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);

    // Carrega a lista de professores da API ao iniciar o componente
    useEffect(() => {
        loadTeachers();
    }, []);
    /**
     * Carrega a lista de professores da API.
     * @async
     */
    const loadTeachers = async () => {
        try {
            const response = await api.get("/professores");
            const teacherData = response.data.data;

            for (let i = 0; i < teacherData.length; i++) {
                const teacher = teacherData[i];
                const fileId = `professor-${teacher.id}`; // Sem especificar a extensão

                try {
                    const fileResponse = await api.get(`/uploads/${fileId}`);
                    if (fileResponse.status === 200) {
                        teacher.filePath = fileResponse.data.url;
                    } else {
                        teacher.filePath = ''; // Ou use uma imagem padrão
                    }
                } catch (error) {
                    console.error(`Erro ao obter o arquivo ${fileId}:`, error);
                    teacher.filePath = ''; // Ou use uma imagem padrão
                }
            }

            setTeachers(teacherData);
        } catch (error) {
            console.error("Erro ao carregar professores:", error);
        }
    };

    /**
     * Abre o modal de formulário para adicionar ou editar um professor.
     * @param {Object|null} teacher O professor a ser editado, ou null para um novo professor.
     */
    const openModal = (teacher = null) => {
        setCurrentTeacher(teacher);
        setIsModalOpen(true);
    };
    // Fecha o modal de formulário
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTeacher(null);
    };
    /**
     * Obtém a extensão de um arquivo com base no seu nome.
     * @param {string} filename O nome do arquivo.
     * @returns {string} A extensão do arquivo.
     */
    function getFileExtension(filename) {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    }
    /**
     * Adiciona ou edita um professor na API.
     * @async
     * @param {string} id O ID do professor para edição, ou null para adição.
     * @param {Object} teacherData Os dados do professor para salvar.
     * @param {File} file O arquivo do professor, se houver.
     * @returns {Promise<Object>} Os dados do professor após salvar.
     */
    const handleAddOrEditTeacher = async (id, teacherData, file) => {
        const apiPath = id ? `/professor/${id}` : "/professor";
        const method = id ? "patch" : "post";
        try {
            const response = await api[method](apiPath, teacherData);
            if (file) {
                const extension = getFileExtension(file.name);
                const fileName = `professor-${response.data.data.id}.${extension}`;
                await uploadFile(response.data.data.id, file, fileName);
            }
            loadTeachers();
            return response.data.data;
        } catch (error) {
            console.error("Erro ao salvar o professor:", error);
        }
    };
    /**
     * Faz o upload de um arquivo para a API.
     * @async
     * @param {number} entityType O tipo da entidade para o nome base do arquivo.
     * @param {number} id O ID da entidade para o nome base do arquivo.
     * @param {File} file O arquivo a ser enviado.
     */
    const uploadFile = async (entityType, id, file) => {
        const extension = getFileExtension(file.name);
        const baseName = `${entityType}-${id}`; /* ESTA LINHA DEFINE O TIPO (PREFIXO), E O NOME SENDO O ID, (SUFIXO), PARA DETERMINAR SE O ARQUIVO DEVE SER SOBREPOSTO */
        const formData = new FormData();
        formData.append('baseName', baseName);
        formData.append("publico", true);
        formData.append('file', file, `${baseName}.${extension}`);

        try {
            await api.post(`/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error("Erro ao fazer upload do arquivo:", error);
        }
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
                <h1 className="text-2xl font-bold mb-4">Gerenciamento de Professores</h1>
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal()}
                    >
                        Adicionar Professor
                    </button>
                </div>
                <TeacherList
                    teachers={teachers}
                    onEdit={openModal}
                    onDelete={handleDeleteTeacher}
                />
                {isModalOpen && (
                    <TeacherFormModal
                        closeModal={closeModal}
                        onSubmit={handleAddOrEditTeacher}
                        teacher={currentTeacher}
                        uploadFile={uploadFile}
                    />
                )}
            </div>
        </PContent>
    );
};

export default TeacherManagementScreen;