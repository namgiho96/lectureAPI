

const { DataTypes, Op } = require('sequelize');
const { BaseModel } = require('./base');
const model = require('./internal');
const config = require('../config/config');
// const logger = require('../modules/logger');


const adminAttributes = {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING, unique:false},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING, unique: true},
    salt : {type: DataTypes.STRING},
}
class AdminModel extends BaseModel {
    constructor(...args) {
        super(...args);
    }
    static initModel(sequelize) {
        AdminModel.sequelize = sequelize;
        AdminModel.init(adminAttributes, {
            sequelize,
            modelName: 'Admin',
            indexes: [{
                unique: true,
                fields: ['email'],
            },
            {
                fields: ['name'],

            }]});
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
        return AdminModel.encryptPassword(enteredPassword, this.salt) === this.password
    }

    static relationModel() {
        AdminModel.hasMany(model.Lecture, {
            foreignKey: 'id',
            as: 'lectures'
        });
    }

}
module.exports = AdminModel;

