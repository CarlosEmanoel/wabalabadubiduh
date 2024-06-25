import path from 'path';

const baseDirectory = '/usr/local/src/performance/files';

/* Para testes Locais: 'C:/work/imagem/upload' */
/* Para a Produção: '/usr/local/src/performance/files' */

export const paths = {
    rootUploadDirectory: baseDirectory,
    imagesDirectory: {
        private: path.join(baseDirectory, 'private/images'),
        public: path.join(baseDirectory, 'public/images')
    },
    videosDirectory: {
        private: path.join(baseDirectory, 'private/videos'),
        public: path.join(baseDirectory, 'public/videos')
    },
    pdfsDirectory: {
        private: path.join(baseDirectory, 'private/pdfs'),
        public: path.join(baseDirectory, 'public/pdfs')
    },
    publicDirectory: path.join(process.cwd(), 'public'),
};