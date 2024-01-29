// multer.config.ts

import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueFilename = uuidv4() + extname(file.originalname);
    callback(null, uniqueFilename);
  },
});
