// middleware/multerConfig.js
import multer from 'multer';
import path from 'path';

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/profileImages/');  // Folder to store profile images
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`  // File name format
    );
  },
});

// Check file type for images
const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

// Middleware for handling image uploads
export const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});
