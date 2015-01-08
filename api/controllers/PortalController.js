/**
 * PortalController
 *
 * @description :: Server-side logic for managing portals
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  detail: function (req, res) {
    var id = req.param("id");

    Portal.findOne(id).populate('keys').exec(function (err, _portal) {
      if (req.isSocket) {
        res.json(_portal);
      
      } else {
        var owners = [];
        for (var i = 0; i < _portal.keys.length; i++) {
          owner = _portal.keys[i].owner;
          
          if (owners.indexOf(owner) == -1) {
            owners.push(owner);
          }
        }

        User.find({'id': owners}).exec(function (err, _users) {
          var _agents = {};
          for (var i = 0; i < _users.length; i++) {
            _agents[_users[i].id] = _users[i];
          }
          res.view('portal', {portal: _portal, agents: _agents});
        });
      }
    });
  },

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

