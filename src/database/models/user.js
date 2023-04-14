const { DataTypes, Op } = require('sequelize');
const { BaseModel } = require('./base');
const model = require('./internal');
const config = require('../config/config');
// const logger = require('../modules/logger');

const userAttributes = {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  name: {type: DataTypes.STRING,unique:false, allowNull: false},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING, allowNull: false,},
  salt : {type: DataTypes.STRING, allowNull: false},
  tutorType: {type: DataTypes.BOOLEAN, defaultValue:false},
  likedLectures:{type: DataTypes.JSON, allowNull: false, defaultValue: []},//유저가 좋아요를 누른 강의 목록을 저장하는 컬럼. 예를 들어, 배열이나 JSON 형태로 저장할 수 있습니다.
}
class UserModel extends BaseModel {
  constructor(...args) {
    super(...args);
  }

  static initModel(sequelize) {
    UserModel.sequelize = sequelize;
    UserModel.init(userAttributes, {
      sequelize,
      modelName: 'User',
      indexes: [
        {
          name: 'idx_users_email',
          fields: ['email'],
          unique: true
        },
        {
          name: 'idx_users_name',
          fields: ['name'],
          unique:false
        }
      ]});
    UserModel.beforeCreate(UserModel.setSaltAndPassword);
    UserModel.beforeUpdate(UserModel.setSaltAndPassword);
  }
  static relationModel() {
    UserModel.belongsToMany(model.Lecture, { through: model.LectureUser, foreignKey: 'id', as: 'lectures'});
  }

  static generateSalt() {
    return crypto.randomBytes(16).toString( 'base64');
  }

  static encryptPassword(plainText, salt){
    return crypto
        .createHash ( 'RSA-SHA256')
        .update (plainText)
        .update (salt)
        .digest ( 'hex')
  }

  static setSaltAndPassword(user){
    if(!user.salt) {
      user.salt = UserModel.generateSalt();
    }
    if (user.changed('password')){
      user.password = UserModel.encryptPassword(user.password, user.salt)
    }
  }
  validatePassword(enteredPassword) {
    return UserModel.encryptPassword(enteredPassword, this.salt) === this.password
  }


}
module.exports = UserModel;
