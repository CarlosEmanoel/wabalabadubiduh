import fs from 'fs';
import { paths } from '../config/fileConfig.js';

const createUploadDirectories = () => {
    const uploadDirectories = [
        paths.imagesDirectory.private,
        paths.imagesDirectory.public,
        paths.videosDirectory.private,
        paths.videosDirectory.public,
        paths.pdfsDirectory.private,
        paths.pdfsDirectory.public
    ];

    uploadDirectories.forEach(directory => {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    });
};

export default createUploadDirectories;
