/**
* Key.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    portal: {
      model: 'portal'
    },
    owner: {
      model: 'user'
    },
    quantity: {
      type: 'integer',
      defaultsTo: 1
    }
  },

  afterCreate: function (values, next) {
    Key.findOne({portal: values.portal}).groupBy('portal').sum('quantity').exec(function (err, keys) {
      Portal.findOne(values.portal).exec(function (err, portal) {
        portal.keysCount = keys.quantity;
        portal.save();
      });
    });
  },

  afterDestroy: function (values, next) {
    values = values.pop();
    Key.findOne({portal: values.portal}).groupBy('portal').sum('quantity').exec(function (err, keys) {
      Portal.findOne(values.portal).exec(function (err, portal) {
        portal.keysCount = keys.quantity;
        portal.save();
      });
    });
  },

  afterUpdate: function (values, next) {
    Key.findOne({portal: values.portal}).groupBy('portal').sum('quantity').exec(function (err, keys) {
      Portal.findOne(values.portal).exec(function (err, portal) {
        portal.keysCount = keys.quantity;
        portal.save();
      });
    });
  }
};

