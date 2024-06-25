import fs from 'fs'; // Importa o módulo de sistema de arquivos do Node.js
import path from 'path'; // Importa o módulo de manipulação de caminhos do Node.js
import { paths } from '../config/fileConfig.js'; // Importa as configurações de caminhos definidos no arquivo config.js
import verifyToken from './verifyToken.js'; // Importa a função de verificação de token para autenticação

// Função recursiva para encontrar um arquivo pelo nome base em um diretório e seus subdiretórios
const findFileByName = (directory, baseFileName) => {
    const files = fs.readdirSync(directory); // Lê o conteúdo do diretório
    for (const file of files) { // Itera sobre cada arquivo ou diretório
        const filePath = path.join(directory, file); // Cria o caminho completo do arquivo
        if (fs.statSync(filePath).isDirectory()) { // Verifica se é um diretório
            const found = findFileByName(filePath, baseFileName); // Chama a função recursivamente para o diretório
            if (found) return found; // Retorna o caminho se o arquivo for encontrado
        } else {
            const filenameWithoutExt = path.basename(file, path.extname(file)); // Remove a extensão do nome do arquivo
            if (filenameWithoutExt === baseFileName) { // Verifica se o nome base coincide
                return filePath; // Retorna o caminho completo do arquivo
            }
        }
    }
    return null; // Retorna null se o arquivo não for encontrado
};

// Middleware para encontrar e servir um arquivo solicitado
const fileFinderMiddleware = async (ctx) => {
    const baseFileName = ctx.params.filename; // Obtém o nome base do arquivo a partir dos parâmetros da requisição

    try {
        // Define os diretórios onde os arquivos podem estar armazenados
        const directories = [
            paths.imagesDirectory.private,
            paths.imagesDirectory.public,
            paths.videosDirectory.private,
            paths.videosDirectory.public,
            paths.pdfsDirectory.private,
            paths.pdfsDirectory.public
        ];

        let filePath = null; // Inicializa a variável do caminho do arquivo como null
        for (const directory of directories) { // Itera sobre os diretórios
            filePath = findFileByName(directory, baseFileName); // Tenta encontrar o arquivo no diretório atual
            if (filePath) break; // Interrompe o loop se o arquivo for encontrado
        }

        if (filePath) { // Se o arquivo for encontrado
            const isPrivate = filePath.includes(paths.imagesDirectory.private) ||
                              filePath.includes(paths.videosDirectory.private) ||
                              filePath.includes(paths.pdfsDirectory.private); // Verifica se o arquivo é privado

            if (isPrivate) { // Se o arquivo for privado
                await verifyToken(ctx, async () => { // Verifica o token de autenticação
                    serveFile(ctx, filePath); // Serve o arquivo se o token for válido
                });
            } else {
                serveFile(ctx, filePath); // Serve o arquivo diretamente se não for privado
            }
        } else {
            ctx.body = { error: 'Arquivo não encontrado!!' }; // Responde com erro se o arquivo não for encontrado
            ctx.status = 404; // Define o status HTTP para 404 (Não encontrado)
        }
    } catch (error) {
        console.error('Erro ao encontrar o arquivo:', error); // Loga o erro no console
        ctx.body = { error: 'Erro interno do servidor' }; // Responde com erro de servidor
        ctx.status = 500; // Define o status HTTP para 500 (Erro interno do servidor)
    }
};

// Função para servir o arquivo encontrado
const serveFile = (ctx, filePath) => {
    ctx.body = fs.createReadStream(filePath); // Cria um stream de leitura do arquivo para o corpo da resposta
    ctx.status = 200; // Define o status HTTP para 200 (OK)
    const ext = path.extname(filePath).slice(1); // Obtém a extensão do arquivo sem o ponto inicial
    const mimeTypes = { // Define os tipos MIME suportados
        'svg': 'image/svg+xml',
        'webp': 'image/webp',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'pdf': 'application/pdf',
        'avi': 'video/avi',
        'mp4': 'video/mp4',
        'mp3': 'audio/mpeg'
    };
    const mimeType = mimeTypes[ext]; // Obtém o tipo MIME correspondente à extensão do arquivo
    ctx.set('Content-Type', mimeType); // Define o cabeçalho Content-Type da resposta
};

export default fileFinderMiddleware; // Exporta o middleware como padrão
