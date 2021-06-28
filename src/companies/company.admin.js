const path = require('path');
const AdminBro = require('admin-bro');
// const uploadFeature = require('@admin-bro/upload');
const { Company } = require('./company.entity');
const { before: passwordBeforeHook, after: passwordAfterHook } = require('../actions/password.hook');
const { before: uploadImageBeforeHook, after: uploadImageAfterHook } = require('../actions/upload-image.hook');

/**
 * @type {AdminBro.ResourceOptions}
 */
const options = {
  properties: {
    encryptedPassword: {
      isVisible: false,
    },
    password: {
      type: 'password',
    },
    uploadImage: {
      components: {
        edit: AdminBro.bundle('../components/upload-image.edit.tsx'),
      },
    },
    uploadedFile: {
      isVisible: false,
    },
  },
  // features: [uploadFeature({
  //   provider: { local: { bucket: path.join(__dirname, '../../public') } },
  //   properties: {
  //     key: 'uploadImage.path',
  //     bucket: 'uploadImage.folder',
  //     mimeType: 'uploadImage.type',
  //     size: 'uploadImage.size',
  //     filename: 'uploadImage.filename',
  //     file: 'uploadImage',
  //   },
  // })],
  actions: {
    new: {
      before: async (request, context) => {
        const modifiedResponse = await passwordBeforeHook(request, context);
        return uploadImageBeforeHook(modifiedResponse, request, context);
      },
      after: async (response, request, context) => {
        const modifiedResponse = await passwordAfterHook(response, request, context);
        return uploadImageAfterHook(modifiedResponse, request, response, context);
      },
    },
    // new: {
    //   before: passwordBeforeHook,
    //   after: passwordAfterHook,
    // },
    edit: {
      before: passwordBeforeHook,
      after: passwordAfterHook,
    },
  },
};

module.exports = {
  options,
  resource: Company,
};
