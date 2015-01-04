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
    keys: {
      collection: 'key',
      via: 'portal'
    },

    getURL: function () {
      var lat = this.getLatitude();
      var lng = this.getLongitude();

      var url = "https://www.ingress.com/intel?ll="+lat+","+lng+"&z=17&pll="+lat+","+lng;
      return url;
    },

    getLatitude: function () {
      return this.latE6 / 1e6;
    },

    getLongitude: function () {
      return this.lngE6 / 1e6;
    }

  }
};

