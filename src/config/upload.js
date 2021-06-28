const multer = require('multer');
const path = require('path');

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

const uploadConfig = {
  directory: uploadFolder,

  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileName = file.originalname;

      return callback(null, fileName);
    },
  }),
};

module.exports = uploadConfig;
