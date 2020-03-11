const uuid = require('uuid/v4');
const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, 'images');
  },
  filename: (req, file, cb) => {
     cb(null, uuid() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
     file.mimetype === 'image/png' ||
     file.mimetype === 'image/jpg' ||
     file.mimetype === 'image/jpeg'
  ) {
     cb(null, true);
  } else {
     cb(null, false);
  }
};

module.exports = {fileStorage, fileFilter};