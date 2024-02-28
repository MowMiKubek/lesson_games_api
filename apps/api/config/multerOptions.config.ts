import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";

export const multerOptions: MulterOptions = {
    limits: {
        fileSize: 5242880, // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        } else {
            cb(new BadRequestException('File not supported'), false);
        }
    },
    storage: diskStorage({
        destination(req, res, cb) {
            const uploadPath = './uploads';
            if(!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const filename = file.originalname;
            cb(null, generateFilename(filename));
        }
    })
};

function generateFilename(filename: string): string {
    const ext = extname(filename);
    return `${uuid()}${ext}`;
}