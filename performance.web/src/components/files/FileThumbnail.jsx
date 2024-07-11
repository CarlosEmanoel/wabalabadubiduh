import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaFilePdf } from "react-icons/fa";

/**
 * Componente que exibe um thumbnail para diferentes tipos de arquivos.
 * Suporta imagens (.jpg, .jpeg, .png), PDFs (.pdf) e vídeos (.mp4, .mov, .avi).
 *
 * @param {Object} props As propriedades do componente.
 * @param {string} props.filePath O caminho do arquivo, usado para determinar o tipo e exibir o thumbnail correto.
 * @param {Function} props.onClick Função a ser executada quando o thumbnail é clicado.
 * @returns {JSX.Element|null} O JSX do thumbnail correspondente ao tipo de arquivo ou null se não for um tipo suportado.
 */

const FileThumbnail = ({ fileName = "", onClick, className }) => {
  const [filePath, setFilePath] = useState("");
  const fileExtensions = [
    "jpg",
    "png",
    "jpeg",
    "svg",
    "webp",
    "pdf",
    "mp4",
    "mov",
    "avi",
  ];

  useEffect(() => {
    const checkFileExistence = async () => {
      for (const ext of fileExtensions) {
        const fullPath = `https://performance.goiania.br/files/${fileName}.${ext}`;
        try {
          const response = await fetch(fullPath, { method: "HEAD" });
          if (response.ok) {
            setFilePath(fullPath);
            return;
          }
        } catch (error) {
          console.error("Erro ao verificar o arquivo:", error);
        }
      }
    };

    if (fileName) {
      checkFileExistence();
    }
  }, [fileName]);

  const renderThumbnail = () => {
    const fileType = filePath.split(".").pop();
    if (["jpg", "jpeg", "png", "svg", "webp"].includes(fileType)) {
      return (
        <img
          src={filePath}
          alt="Thumbnail"
          className={`${className} cursor-pointer max-w-full h-auto object-contain max-h-24`}
          onClick={onClick}
        />
      );
    } else if (fileType === "pdf") {
      return (
        <FaFilePdf
          className="cursor-pointer max-w-full h-auto object-contain max-h-24"
          size={80}
          onClick={onClick}
        />
      );
    } else if (["mp4", "mov", "avi"].includes(fileType)) {
      return (
        <video
          className="cursor-pointer max-w-full h-auto object-contain max-h-24"
          preload="metadata"
          onClick={onClick}
        >
          <source src={filePath} type={`video/${fileType}`} />
          Seu navegador não tem suporte para vídeos!
        </video>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center">{renderThumbnail()}</div>
  );
};

FileThumbnail.propTypes = {
  filePath: PropTypes.string.isRequired, // Define que filePath é uma propriedade obrigatória e deve ser uma string
  onClick: PropTypes.func, // Define que onClick é opcional e deve ser uma função
};

export default FileThumbnail;
