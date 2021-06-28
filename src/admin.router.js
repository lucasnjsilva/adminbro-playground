const express = require('express');
const argon2 = require('argon2');
const { default: AdminBro } = require('admin-bro');
const { buildAuthenticatedRouter } = require('admin-bro-expressjs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// const MongoStore = connectMongo(session);

const { Company } = require('./companies/company.entity');

/**
 *
 * @param {AdminBro} admin
 * @returns {express.Router} router
 */
const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(admin, {
    cookieName: 'admin-bro',
    cookiePassword: 'superlongandcomplicatedname',
    authenticate: async (email, password) => {
      const company = await Company.findOne({ email });

      if (company && argon2.verify(company.encryptedPassword, password)) {
        return company.toJSON();
      }
      return null;
    },
  }, null, {
    resave: false,
    saveUninitialized: true,
    preventAssignment: true,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/adminbro',
    }),
  });
  return router;
};

module.exports = buildAdminRouter;
