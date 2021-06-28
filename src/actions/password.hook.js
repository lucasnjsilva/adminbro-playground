const argon2 = require('argon2');
const AdminBro = require('admin-bro');

/**
 *
 * @type {AdminBro.Before}
 */
const before = async (request) => {
  if (request.method === 'post') {
    const { password, ...otherParams } = request.payload;

    if (password) {
      const encryptedPassword = await argon2.hash(password);

      return {
        ...request,
        payload: {
          ...otherParams,
          encryptedPassword,
        },
      };
    }
  }
  return request;
};

/**
 *
 * @type {AdminBro.After<AdminBro.ActionResponse>}
 */
const after = async (response) => {
  if (response.record && response.record.errors && response.record.errors.encryptedPassword) {
    response.record.errors.password = await response.record.errors.encryptedPassword;
  }
  return response;
};

module.exports = { before, after };
