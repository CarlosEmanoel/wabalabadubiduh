import fs from 'fs';
import path from 'path';
import { paths } from '../config/fileConfig.js';

export const listFiles = async (ctx) => {
    try {
        const allFiles = [];
        const traverseDirectories = (directory, visitedFiles) => {
            const files = fs.readdirSync(directory);
            files.forEach((file) => {
                const filePath = path.join(directory, file);
                try {
                    const stats = fs.statSync(filePath);
                    if (stats.isDirectory()) {
                        traverseDirectories(filePath, visitedFiles);
                    } else {
                        const fileSize = stats.size;
                        // Ajuste para formar corretamente a URL
                        const relativePath = path.relative(paths.rootUploadDirectory, filePath);
                        const formattedPath = relativePath.split(path.sep).join('/'); // Assegura o uso de barras normais
                        const fileUrl = `${ctx.headers.origin}/files/${formattedPath}`;
                        /* const fileUrl = `${ctx.headers.origin}/files/${file}`; */
                        if (!visitedFiles.has(fileUrl)) {
                            visitedFiles.add(fileUrl);
                            allFiles.push({
                                name: file,
                                url: fileUrl,
                                size: fileSize
                            });
                        }
                    }
                } catch (error) {
                    console.error(`Erro ao acessar o arquivo: ${filePath}`, error);
                }
            });
        };

        const visitedFiles = new Set();
        traverseDirectories(paths.rootUploadDirectory, visitedFiles);

        ctx.body = allFiles;
        ctx.status = 200;
    } catch (error) {
        console.error('Erro ao listar arquivos:', error);
        ctx.body = { error: 'Erro ao listar arquivos' };
        ctx.status = 500;
    }
};

// Função modificada para retornar o arquivo sem especificar a extensão
export const getFile = async (ctx) => {
    const baseFileName = ctx.params.id; // Nome base do arquivo (e.g., 'professor-123')

    // Função para encontrar o arquivo correspondente entre várias extensões
    const findFile = (directory, baseFileName) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png']; // Extensões permitidas
        try {
            const files = fs.readdirSync(directory);
            for (const file of files) {
                const filePath = path.join(directory, file);
                if (fs.statSync(filePath).isDirectory()) {
                    const found = findFile(filePath, baseFileName);
                    if (found) return found;
                } else {
                    const filenameWithoutExt = path.basename(file, path.extname(file));
                    if (filenameWithoutExt === baseFileName && allowedExtensions.includes(path.extname(file).toLowerCase())) {
                        return filePath; // Retorna o caminho completo do arquivo com extensão
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao buscar arquivos:', error);
        }
        return null;
    };

    try {
        const filePath = findFile(paths.rootUploadDirectory, baseFileName);
        if (filePath) {
            const relativePath = path.relative(paths.rootUploadDirectory, filePath); // Obtém o caminho relativo
            const formattedPath = relativePath.split(path.sep).join('/'); // Assegura o uso de barras normais
            const fileUrl = `${ctx.headers.origin}/files/${formattedPath}`; // Formata a URL corretamente
            ctx.body = { url: fileUrl };
            ctx.status = 200;
        } else {
            ctx.body = { url: null }; // Modificação aqui para retornar null em vez de erro
            ctx.status = 200; // Retornando status 200 com a URL como null
        }
    } catch (error) {
        console.error('Erro ao buscar arquivo:', error);
        ctx.body = { error: 'Erro ao buscar arquivo', url: null };
        ctx.status = 500;
    }
};

// Função para fazer upload de um arquivo
export const uploadFile = async (ctx) => {
    try {
        ctx.body = { message: 'Arquivo enviado com sucesso' };
        ctx.status = 201;
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        ctx.body = { error: 'Erro ao fazer upload' };
        ctx.status = 500;
    }
};

// Função para deletar um arquivo
export const deleteFile = async (ctx) => {
    const fileId = ctx.params.id; // Nome do arquivo com extensão
    let filePath;

    // Função para tentar encontrar e deletar o arquivo
    const tryDelete = (directory) => {
        const pathToFile = path.join(directory, fileId);
        if (fs.existsSync(pathToFile)) {
            fs.unlinkSync(pathToFile);
            return true;
        }
        return false;
    };

    // Tenta deletar de cada possível diretório
    const directories = [
        paths.imagesDirectory.private,
        paths.imagesDirectory.public,
        paths.videosDirectory.private,
        paths.videosDirectory.public,
        paths.pdfsDirectory.private,
        paths.pdfsDirectory.public
    ];

    const fileDeleted = directories.some(tryDelete);

    if (fileDeleted) {
        ctx.body = { message: 'Arquivo deletado com sucesso' };
        ctx.status = 200;
    } else {
        ctx.throw(404, 'Arquivo não encontrado');
    }
}
