const blogRoutes = require('./blog_routes');
module.exports = function(app, db){
  blogRoutes(app, db);
};
