const User = require('./user');
const UserLecture = require('./lecture-user');

module.exports = (sequelize, DataTypes,Deferrable) => {
  const Lecture = sequelize.define('Lecture', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adminId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Admins', key: 'id', deferrable: Deferrable.INITIALLY_DEFERRED()}},
    userId: {type: DataTypes.UUID, allowNull: false, references: {model: 'Users', key: 'id', deferrable: Deferrable.INITIALLY_DEFERRED()}},
    name: {type: DataTypes.STRING, allowNull: false},
    coverImage: {type: DataTypes.STRING, allowNull: false},
    field:{type: DataTypes.STRING, allowNull: false},
    content:{type: DataTypes.STRING, allowNull: false},
    like:{type: DataTypes.INTEGER, allowNull: false},
    payType:{type: DataTypes.INTEGER, allowNull: false},
    tutor:{type: DataTypes.JSON, allowNull: false, defaultValue: []},
    lectures: {type: DataTypes.JSON, allowNull: false, defaultValue: []},
    likedByUsers: {type: DataTypes.JSON, allowNull: false, defaultValue: []}
  }, {});
  Lecture.associate = function(models) {
    Lecture.belongsToMany(models.User, { through: UserLecture });
  };
  return Lecture;
};

