/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

	login: function (req, res) {

    User.findByUsername(req.body.username).exec(function (err, user) {
      if (err) res.forbidden('Access denied.');

      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, match) {
          if (err) res.serverError('Internal error');

          if (match) {
            req.session.user = user.id;
            res.ok('TODO');
          } else {
            if (req.session.user) req.session.user = null;
            res.badRequest('Invalid password');
          }
        });
      } else {
        res.badRequest('User not found');
      }
    });
  }
};

