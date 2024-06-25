import React from 'react';
import PropTypes from 'prop-types';
import { FaFilePdf } from 'react-icons/fa';

/**
 * Componente que exibe um thumbnail para diferentes tipos de arquivos.
 * Suporta imagens (.jpg, .jpeg, .png), PDFs (.pdf) e vídeos (.mp4, .mov, .avi).
 *
 * @param {Object} props As propriedades do componente.
 * @param {string} props.filePath O caminho do arquivo, usado para determinar o tipo e exibir o thumbnail correto.
 * @param {Function} props.onClick Função a ser executada quando o thumbnail é clicado.
 * @returns {JSX.Element|null} O JSX do thumbnail correspondente ao tipo de arquivo ou null se não for um tipo suportado.
 */

const FileThumbnail = ({ filePath, onClick }) => {
    const isImage = filePath.toLowerCase().endsWith('.jpg') || filePath.toLowerCase().endsWith('.png') || filePath.toLowerCase().endsWith('.jpeg') || filePath.toLowerCase().endsWith('.svg') || filePath.toLowerCase().endsWith('.webp');
    const isPdf = filePath.toLowerCase().endsWith('.pdf');
    const isVideo = filePath.toLowerCase().endsWith('.mp4') || filePath.toLowerCase().endsWith('.mov') || filePath.toLowerCase().endsWith('.avi');

    const renderThumbnail = () => {
        if (isImage) {
            return (
                <img
                    src={filePath}
                    alt="Thumbnail"
                    className="cursor-pointer max-w-full h-auto object-contain max-h-24"
                    onClick={onClick}
                />
            );
        } else if (isPdf) {
            return (
                <FaFilePdf
                    className="cursor-pointer max-w-full h-auto object-contain max-h-24"
                    size={80}
                    onClick={onClick}
                />
            );
        } else if (isVideo) {
            return (
                <video
                    className="cursor-pointer max-w-full h-auto object-contain max-h-24"
                    preload="metadata"
                    onClick={onClick}
                >
                    <source src={filePath} type="video/mp4" />
                    Seu navegador não tem suporte para vídeos!
                </video>
            );
        }
        return null;
    };

    return (
        <div className="flex justify-center items-center">
            {renderThumbnail()}
        </div>
    );
};

FileThumbnail.propTypes = {
    filePath: PropTypes.string.isRequired, // Define que filePath é uma propriedade obrigatória e deve ser uma string
    onClick: PropTypes.func // Define que onClick é opcional e deve ser uma função
};

export default FileThumbnail;
