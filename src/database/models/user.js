const { DataTypes, Op } = require('sequelize');
const { BaseModel } = require('./base');
const model = require('./internal');
const config = require('../config/config');
// const logger = require('../modules/logger');


const userAttributes = {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  name: {type: DataTypes.STRING, defaultValue: ''},
  email: {type: DataTypes.STRING, defaultValue: ''},
  password: {type: DataTypes.STRING, defaultValue: ''},
  salt : {type: DataTypes.STRING},
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
      indexes: []});
    UserModel.beforeCreate(UserModel.setSaltAndPassword);
    UserModel.beforeUpdate(UserModel.setSaltAndPassword);
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
