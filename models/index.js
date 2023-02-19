const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment')

User.hasMany(Project, {
  foreignKey: 'username_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'username_id'
});

Project.hasMany(Comment, {
  foreignKey: 'username_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Project, {
  foreignKey: 'project_id'
});


module.exports = { User, Project,Comment };
