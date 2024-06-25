import React, { useState, useEffect } from 'react';
import fileFetcherUrlHook from '../../../hooks/files/fileFetcherUrlHook';
import CircleLoad from '../../loads/circles/CircleLoad';
import { PSkeleton } from '../..';

const FileFetcher = ({ fileName = '', masked = false, className, onClick, videoControls = false, activity = true, skeleton = false }) => {
    const [fileUrl, setFileUrl] = useState(null);
    const [mimeType, setMimeType] = useState(null);

    useEffect(() => {
        fileFetcherUrlHook(fileName, setFileUrl, setMimeType, masked);
    }, [fileName]);

    if (!fileUrl && activity) {
        return (
            <div className='w-full items-center justify-center flex-col flex'>
                <CircleLoad />
            </div>
        );
    } else if (!fileUrl && skeleton) {
        <PSkeleton icon className={'bg-gray-400 w-36 h-[57vh]'} />
    }

    return (
        <div className='flex justify-center items-center'>
            {mimeType === 'application/pdf' ? (
                <iframe draggable={false} className={`${className}`} onClick={onClick} src={fileUrl} title="PDF Viewer"></iframe>
            ) : mimeType.startsWith('video/') ? (
                <video draggable={false} className={`${className}`} onClick={onClick} controls={videoControls}>
                    <source src={fileUrl} type={mimeType} />
                    Seu navegador não suporta a exibição deste vídeo.
                </video>
            ) : (
                <img draggable={false} className={`${className}`} onClick={onClick} src={fileUrl} alt={fileName} />
            )}
        </div>
    );
};

export default FileFetcher;
