import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'company-images';
    const uploadDir = path.join(__dirname, '../../../uploads', uploadPath);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

export async function deleteImage(imageUrl: string) {
  const uploadPath = 'company-images';
  const uploadDir = path.join(__dirname, '../../../uploads', uploadPath, imageUrl);

  await fs.unlink(uploadDir);
}

export const uploadCompanyImage = multer({ storage: storage });
