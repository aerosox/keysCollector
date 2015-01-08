/**
 * PortalController
 *
 * @description :: Server-side logic for managing portals
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  searchView: function (req, res) {
    var agents = [];

    User.find().exec(function (err, users) {
      while (users.length) {
        var user = users.pop();
        var agent = {id: user.id, name: user.agentName};
        agents.push(agent);
      }
      res.view('portal-search', {agents: agents});
    });
  },

  search: function (req, res) {
    if (req.param('agentName') != 0) {
      User.findOne(req.param('agentName')).populate('keys').exec(function (err, user) {
        
        var userPortalsID = [];
        for (var i = 0; i < user.keys.length; i++) {
          userPortalsID.push(user.keys[i].portal);
        };
        
        Portal.find({title: {'contains': req.param('portalName')}, id: userPortalsID}).exec(function (err, portals) {
          res.json(portals);
        });
      });
    
    } else {
      Portal.find({title: {'contains': req.param('portalName')}}).exec(function (err, portals) {
        res.json(portals);
      });
    }
  }
};

