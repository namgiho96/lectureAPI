const { DataTypes, Op, Deferrable } = require('sequelize');
const { BaseModel } = require('./base');
const model = require('./internal');
const config = require('../config/config');
// const logger = require('../modules/logger');

const lectureUserAttributes = {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
  adminId: {type: DataTypes.UUID, allowNull: true,unique:true, references: {model: 'Admins', key: 'id', deferrable: Deferrable.INITIALLY_DEFERRED()}},
  userId: {type: DataTypes.UUID, allowNull: true, unique:true,references: {model: 'Users', key: 'id', deferrable: Deferrable.INITIALLY_DEFERRED()}},
  name: {type: DataTypes.STRING, allowNull: false},
  coverImage: {type: DataTypes.STRING, allowNull: false},
  field:{type: DataTypes.STRING, allowNull: false},
  content:{type: DataTypes.STRING, allowNull: false},
  like:{type: DataTypes.INTEGER, allowNull: false},
  payType:{type: DataTypes.STRING, allowNull: false},
  pay:{type: DataTypes.INTEGER, allowNull: false},
  tutor:{type: DataTypes.JSON, allowNull: false, defaultValue: []},
  lectures: {type: DataTypes.JSON, allowNull: true, defaultValue: []},
  likedByUsers: {type: DataTypes.JSON, allowNull: true, defaultValue: []}
}
class LectureModel extends BaseModel {
  constructor(...args) {
    super(...args);
  }
  static initModel(sequelize) {
    LectureModel.sequelize = sequelize;
    LectureModel.init(lectureUserAttributes, {
      sequelize,
      modelName: 'Lecture',
      indexes: [{
        name: 'idx_lectures_admin_id',
        fields: ['adminId'],
        },
        {
          name: 'idx_lectures_user_id',
          fields: ['userId'],
        },
      ]});
  }

  static relationModel() {
    LectureModel.belongsTo(model.Admin, { foreignKey: 'adminId', onDelete: 'CASCADE' });
    LectureModel.belongsToMany(model.User, { through: model.LectureUser, foreignKey: 'id' });
    LectureModel.belongsToMany(model.Keyword, { through: model.LectureKeyword, foreignKey: 'lectureId' });
  }

}
module.exports = LectureModel;



