const express = require('express');
const mongoose = require('mongoose');
const { default: AdminBro } = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');

const app = express();
const port = 3333;

const run = async () => {
  // Conectando ao mongoose
  await mongoose.connect('mongodb://localhost:27017/adminbro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);

  // Definindo as options e router
  app.use(admin.options.rootPath, router);
  // app.use('/public', express.static('public'));
  app.listen(port, () => {
    console.log(`AdminBro disponível em http://localhost:${port}/admin`);
  });
};

module.exports = run;
