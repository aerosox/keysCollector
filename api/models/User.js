/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

function hashPassword(values, next) {
  bcrypt.hash(values.password, 10, function(err, hash) {
    if (err) return next(err);

    values.password = hash;
    next();
  });
}

module.exports = {

  attributes: {
    agentName: {
      type: 'string',
      unique: true
    },
    password: 'string',
    keys: {
      collection: 'key',
      via: 'owner'
    }
  },

  beforeCreate: function (values, next) {
    hashPassword(values, next);
  },

  beforeUpdate: function () {
    if (values.password) {
      hashPassword(values, next);
    } else {
      User.findOne(values.id).done(function(err, user) {
        if (err) {
          next(err);
        } else {
          values.password = user.password;
          next();
        }
      });
    }
  }
};

