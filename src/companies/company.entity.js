const mongoose = require('mongoose');

const UploadedFile = new mongoose.Schema({
  path: String,
  type: String,
  size: Number,
  folder: String,
  filename: String,
});

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  // profilePhotoLocation: {
  //   type: String,
  // },
  uploadedFile: UploadedFile,
  encryptedPassword: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = { CompanySchema, Company };
