/**
* Portal.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    ingressId: {
      type: 'string',
      unique: true
    },
    title: 'string',
    image: 'string',
    latE6: 'string',
    lngE6: 'string',
    url: 'string',
    keysCount: 'integer',
    keys: {
      collection: 'key',
      via: 'portal'
    }
  },

  beforeCreate: function (values, next) {
    var lat = values.latE6 / 1e6;
    var lng = values.lngE6 / 1e6;
    
    values.url = "https://www.ingress.com/intel?ll="+lat+","+lng+"&z=17&pll="+lat+","+lng;
    next();
  }
};

