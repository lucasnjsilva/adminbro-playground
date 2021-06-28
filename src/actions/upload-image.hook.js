const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');
const uploadConfig = require('../config/upload');

/** @type {AdminBro.Before} */
const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadImage, ...otherParams } = request.payload;

    context.uploadImage = uploadImage;
    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, uploadImage } = context;

  // if (record.isValid() && uploadImage) {
  //   const filePath = path.join('uploads', record.id().toString(), uploadImage.name);

  //   await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  //   await fs.promises.rename(uploadImage.path, filePath);

  //   await record.update({ profilePhotoLocation: `/${filePath}` });
  // }

  if (request.file) {
    const imageFileName = request.file.filename;
    await fs.promises.mkdir(path.dirname(imageFileName), { recursive: true });
    await fs.promises.rename(uploadConfig.path, imageFileName);
  }

  return response;
};

module.exports = { before, after };