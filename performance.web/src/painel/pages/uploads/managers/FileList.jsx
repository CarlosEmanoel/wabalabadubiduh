import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FileThumbnail from "./FileThumbnail";
import FileIcon from "./FileIcon";

/**
 * Componente para listar arquivos com opções de filtragem e ordenação, e ações como exibir e deletar.
 * 
 * @param {Object} props - Propriedades do componente.
 * @param {Array} props.files - Lista de arquivos a serem exibidos.
 * @param {Function} props.setExpandedContent - Função para definir o conteúdo expandido.
 * @param {Function} props.deleteFile - Função para deletar um arquivo.
 * @param {Function} props.formatFileSize - Função para formatar o tamanho do arquivo.
 * @returns {JSX.Element} Retorna uma tabela de arquivos com funcionalidades interativas.
 */

const FileList = ({ files, setExpandedContent, deleteFile, formatFileSize }) => {
    const [filterName, setFilterName] = useState(""); // Estado inicial do filtro por nome
    const [filterType, setFilterType] = useState(""); // Estado inicial do filtro por tipo de arquivo
    const [sortKey, setSortKey] = useState(null); // Estado inicial do tipo de filtro selecionado
    const [sortDirection, setSortDirection] = useState("asc"); // Estado inicial do filtro de "sort by", que lista os arquivos por tamanho

    const getFileType = (filePath) => {

        if (filePath.toLowerCase().endsWith('.jpg') || filePath.toLowerCase().endsWith('.png') || filePath.toLowerCase().endsWith('.jpeg') || filePath.toLowerCase().endsWith('.svg') || filePath.toLowerCase().endsWith('.webp')) {
            return "image";
        } else if (filePath.endsWith(".pdf")) {
            return "pdf";
        } else if (filePath.toLowerCase().endsWith('.mp4') || filePath.toLowerCase().endsWith('.mov') || filePath.toLowerCase().endsWith('.avi')) {
            return "video";
        }
        return "other";
    };

    const applyFilters = (files) => {
        return files
            .filter(file => {
                return (filterType ? getFileType(file.url) === filterType : true) &&
                    (filterName ? file.name.toLowerCase().includes(filterName.toLowerCase()) : true);
            })
            .sort((a, b) => {
                if (sortKey === "nome") {
                    return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                } else if (sortKey === "tamanho") {
                    return sortDirection === "asc" ? a.size - b.size : b.size - a.size;
                }
                return 0;
            });
    };

    const handleSortChange = (key) => {
        if (key === sortKey) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    };

    const filteredAndSortedFiles = applyFilters(files);

    return (
        <table className="w-full table-fixed">
            <thead className="bg-gray-100">
                <tr>
                    <th className="w-1/10 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Miniatura Da Imagem
                    </th>
                    <th className="w-2/5 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nome do Arquivo
                        <input
                            type="text"
                            placeholder="Filtrar por nome..."
                            onChange={(e) => setFilterName(e.target.value)}
                            className="mt-1 py-2 px-2 border shadow-sm w-full"
                        />
                    </th>
                    <th
                        className="w-1/20 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange("tamanho")}
                    >
                        Tamanho
                    </th>
                    <th className="w-1/20 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Tipo
                        <select
                            onChange={(e) => setFilterType(e.target.value)}
                            className="mt-1 p-1 border rounded shadow-sm w-full"
                        >
                            <option value="">Todos</option>
                            <option value="image">Imagens</option>
                            <option value="pdf">Documentos</option>
                            <option value="video">Vídeos</option>
                        </select>
                    </th>
                    <th className="w-1/20 text-center border px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredAndSortedFiles.map((file, index) => (
                    <tr key={index}>
                        <td className="border">
                            <FileThumbnail
                                filePath={file.url}
                                onClick={() => setExpandedContent(file.url)}
                            />
                        </td>
                        <td className="border">{file.name}</td>
                        <td className="border text-center">
                            {formatFileSize(file.size)}
                        </td>
                        <td className="border text-center">
                            <FileIcon filePath={file.url} />
                        </td>
                        <td className="border text-center">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => deleteFile(file.name)}
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

FileList.propTypes = {
    files: PropTypes.arrayOf(PropTypes.object).isRequired, // Propriedade files: array de objetos representando arquivos (obrigatória)
    setExpandedContent: PropTypes.func.isRequired, // Propriedade setExpandedContent: função chamada para definir o conteúdo expandido (obrigatória)
    deleteFile: PropTypes.func.isRequired, // Propriedade deleteFile: função chamada para excluir um arquivo (obrigatória)
    formatFileSize: PropTypes.func.isRequired, // Propriedade formatFileSize: função chamada para formatar o tamanho do arquivo (obrigatória)
};

export default FileList;