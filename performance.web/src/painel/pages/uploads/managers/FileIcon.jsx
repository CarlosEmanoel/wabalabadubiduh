import React from 'react';
import PropTypes from 'prop-types';

import { CiImageOn } from "react-icons/ci";
import { ImFilePdf } from "react-icons/im";
import { PiVideoThin } from "react-icons/pi";
import { PiFileSvgThin } from "react-icons/pi";
import { PiGoogleChromeLogoThin } from "react-icons/pi";
import { PTooltip } from '../../../../components';

/**
 * Componente que exibe ícones específicos baseados na extensão do arquivo fornecido.
 * Suporta imagens (jpg, jpeg, png), PDFs, e vídeos (mp4, mov, avi).
 * 
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.filePath - O caminho do arquivo, que determina qual ícone será exibido.
 * @param {Object} props.iconDetails - Alimenta o tooltip que explica cada formato apenas com o hover.
 * @returns {JSX.Element|null} Retorna o ícone correspondente à extensão do arquivo ou null se a extensão não for suportada.
 */

const FileIcon = ({ filePath }) => {
    const fileType = filePath.split('.').pop().toLowerCase();

    const iconDetails = {
        'jpg': {
            size: 60,
            Icon: CiImageOn,
            color: '#007C00',
            label: 'Imagem JPG',
            description: 'Um formato muito usado para fotos, que equilibra qualidade e tamanho do arquivo de forma eficiente.'
        },
        'jpeg': {
            size: 60,
            Icon: CiImageOn,
            color: '#007C00',
            label: 'Imagem JPEG',
            description: 'Popular para imagens digitais, esse formato é ótimo para manter cores vibrantes em fotos.'
        },
        'png': {
            size: 60,
            Icon: CiImageOn,
            color: '#007C00',
            label: 'Imagem PNG',
            description: 'Perfeito para imagens com detalhes nítidos ou fundo transparente, sem perder qualidade.'
        },
        'pdf': {
            size: 45,
            Icon: ImFilePdf,
            color: '#D80000',
            label: 'Documento PDF',
            description: 'Usado para guardar documentos de forma que apareçam exatamente como planejado, não importa o dispositivo.'
        },
        'mp4': {
            size: 60,
            Icon: PiVideoThin,
            color: '#0071B2',
            label: 'Vídeo MP4',
            description: 'Um formato de vídeo comum que oferece boa qualidade de imagem e não ocupa muito espaço.'
        },
        'mov': {
            size: 60,
            Icon: PiVideoThin,
            color: '#0071B2',
            label: 'Vídeo MOV',
            description: 'Desenvolvido pela Apple, é bastante usado em edição de vídeo por sua flexibilidade e qualidade.'
        },
        'avi': {
            size: 60,
            Icon: PiVideoThin,
            color: '#0071B2',
            label: 'Vídeo AVI',
            description: 'Um dos formatos de vídeo mais antigos, ainda usado para arquivos de vídeo grandes.'
        },
        'svg': {
            size: 60,
            Icon: PiFileSvgThin,
            color: '#F57C13',
            label: 'Imagem SVG',
            description: 'Ideal para logos e ilustrações, pois podem ser aumentadas ou diminuídas sem perder qualidade.'
        },
        'webp': {
            size: 60,
            Icon: PiGoogleChromeLogoThin,
            color: '#6A0DAD',
            label: 'Imagem WebP',
            description: 'Formato moderno de imagem que faz imagens mais leves para carregar rapidamente em sites.'
        }
    };

    const { Icon, color, label, description, size } = iconDetails[fileType] || {};

    if (!Icon) return null; // Se o tipo de arquivo não for suportado, retorna null.

    return (
        <div className='group relative cursor-pointer flex justify-center'>
            <Icon style={{ color, fontSize: size }} />
            <PTooltip label={label} description={description} />
        </div>
    );
};

FileIcon.propTypes = {
    filePath: PropTypes.string.isRequired
};

export default FileIcon;