const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const AdminCompany = require('./companies/company.admin');

AdminBro.registerAdapter(AdminBroMongoose);

/**
 * @type {AdminBro.AdminBroOptions}
 */
const options = {
  resources: [AdminCompany],
};

module.exports = options;
