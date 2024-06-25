import React from 'react';
import TeacherThumbnail from './TeacherThumbnail';
import PropTypes from 'prop-types';
import { PFileFetcher } from '../../../../components';

/**
 * Lista de professores exibida em uma tabela, com ações para editar e deletar cada professor.
 *
 * @param {Object} props As propriedades do componente.
 * @param {Array} props.teachers Lista de objetos contendo informações dos professores.
 * @param {Function} props.onEdit Função chamada ao clicar no botão "Editar", recebendo o professor como argumento.
 * @param {Function} props.onDelete Função chamada ao clicar no botão "Deletar", recebendo o ID do professor como argumento.
 * @returns {JSX.Element} A tabela de professores.
 */

const TeacherList = ({ teachers, onEdit, onDelete }) => {
    console.log(teachers)
    return (
        <table className="w-full table-fixed">
            <thead className="bg-gray-100">
                <tr>
                    <th className="w-1/3 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Thumbnail</th>
                    <th className="w-1/3 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
                    <th className="w-1/3 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Currículo</th>
                    <th className="w-1/3 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                </tr>
            </thead>
            <tbody>
                {teachers.map((teacher, index) => (
                    <tr key={index}>
                        <td className="border">
                            <PFileFetcher fileName={teacher.id} />
                        </td>
                        <td className="border">{teacher.nome}</td>
                        <td className="border line-clamp-5">{teacher.curriculo}</td>
                        <td className="border text-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => onEdit(teacher)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                onClick={() => onDelete(teacher.id)}
                            >
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

TeacherList.propTypes = {
    teachers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired, // Cada objeto deve ter um id, uma string que identifica exclusivamente o professor (obrigatório)
        nome: PropTypes.string.isRequired, // Cada objeto deve ter um nome, uma string que representa o nome do professor (obrigatório)
        curriculo: PropTypes.string, // Cada objeto pode ter um currículo, uma string que representa o currículo do professor (opcional)
        filePath: PropTypes.string, // Cada objeto pode ter um filePath, uma string que representa o caminho do arquivo relacionado ao professor (opcional)
    })).isRequired, // A propriedade teachers é requerida
    onEdit: PropTypes.func.isRequired, // Propriedade onEdit: função chamada quando uma ação de edição for acionada no componente TeacherList - Propriedade requerida
    onDelete: PropTypes.func.isRequired, // Propriedade onDelete: função chamada quando uma ação de exclusão for acionada no componente TeacherList - Propriedade requerida
};

export default TeacherList;
