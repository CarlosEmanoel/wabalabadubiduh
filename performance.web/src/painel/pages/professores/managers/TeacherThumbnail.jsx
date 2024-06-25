import React from 'react';
import { FaFileImage } from 'react-icons/fa';
import PropTypes from 'prop-types';

/**
 * Componente que exibe um thumbnail para um professor. Mostra uma imagem se um caminho for fornecido, 
 * ou um ícone padrão se não houver imagem disponível.
 * 
 * @param {Object} props As propriedades do componente.
 * @param {string|null} props.filePath O caminho para o arquivo de imagem do thumbnail.
 * @param {Function} props.onClick Função a ser chamada quando a imagem é clicada.
 * @returns {JSX.Element} Elemento JSX que mostra o thumbnail.
 */

const TeacherThumbnail = ({ filePath, onClick }) => {
    const imageIconStyle = { color: '#007C00', size: 60 }; // Estilos para o ícone de imagem padrão.
    /**
     * Renderiza o thumbnail com base na presença de um caminho de arquivo.
     * Se filePath for null, exibe um ícone padrão. Caso contrário, mostra a imagem.
     * 
     * @returns {JSX.Element} O thumbnail como um componente de imagem ou ícone.
     */
    const renderThumbnail = () => {
        if (filePath === null) {
            return <div className='flex justify-center'><FaFileImage {...imageIconStyle} /></div>
        } else {
            return (
                <img
                    src={filePath}
                    alt="Thumbnail"
                    className="max-w-full h-auto object-contain max-h-24"
                    onClick={onClick}
                />
            );
        }
    };

    return (
        <div className="flex justify-center items-center">
            {renderThumbnail()}
        </div>
    );
};

TeacherThumbnail.propTypes = {
    filePath: PropTypes.string, // Propriedade filePath: representa o caminho do arquivo relacionado ao professor (opcional)
    onClick: PropTypes.func, // Propriedade onClick: função chamada quando o componente TeacherThumbnail é clicado (opcional)
};

export default TeacherThumbnail;