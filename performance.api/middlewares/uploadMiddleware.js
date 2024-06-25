import multer from 'koa-multer';
import fs from 'fs';
import { paths } from '../config/fileConfig.js';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const privacy = req.body.publico === 'true' ? 'public' : 'private'; // Certifique-se que estamos tratando como string
        let fileType;

        if (file.mimetype.startsWith('image')) {
            fileType = paths.imagesDirectory[privacy];
        } else if (file.mimetype.startsWith('video')) {
            fileType = paths.videosDirectory[privacy];
        } else if (file.mimetype === 'application/pdf') {
            fileType = paths.pdfsDirectory[privacy];
        } else {
            return cb(new Error('Tipo de arquivo não suportado'), null);
        }

        cb(null, fileType);
    },
    filename: function (req, file, cb) {
        const baseName = req.body.baseName; // Deve ser como 'professor-1', 'curso-1'
        if (!baseName) {
            cb(new Error('Nome base do arquivo não fornecido'), null);
            return;
        }

        const directory = paths.imagesDirectory.public; // Ou use uma lógica para decidir baseado em file.mimetype
        const extension = path.extname(file.originalname).toLowerCase();

        // Remove qualquer arquivo existente com o mesmo nome base
        const existingFiles = fs.readdirSync(directory);
        existingFiles.forEach(existingFile => {
            if (existingFile.startsWith(baseName)) {
                fs.unlinkSync(path.join(directory, existingFile));
            }
        });

        cb(null, `${baseName}${extension}`);
    }
});

const uploadMiddleware = multer({ storage: storage });

export default uploadMiddleware;