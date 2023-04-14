
const { DataTypes, Op, Deferrable } = require('sequelize');
const { BaseModel } = require('./base');
const model = require('./internal');
const config = require('../config/config');
// const logger = require('../modules/logger');

const lectureUserAttributes = {
    userId: {type: DataTypes.UUID, allowNull: true, references: {model: model.User, key: 'id', deferrable: Deferrable.INITIALLY_DEFERRED()}},
    adminId: { type: DataTypes.UUID, allowNull: true, references: { model: model.Admin, key: 'id', deferrable: Deferrable.INITIALLY_DEFERRED } },
    lectureId: {type: DataTypes.INTEGER, allowNull: true,references: {model: model.Lecture, key: 'id'}},
}
class LectureUserModel extends BaseModel {
    constructor(...args) {
        super(...args);
    }
    static initModel(sequelize) {
        LectureUserModel.sequelize = sequelize;
        LectureUserModel.init(lectureUserAttributes, {
            sequelize,
            modelName: 'LectureUser',
            indexes: [{
                fields: ['userId', 'lectureId']
            }
            ]});
    }

    static relationModel() {
        LectureUserModel.belongsTo(model.Admin, { foreignKey: 'id', onDelete: 'CASCADE' });
        LectureUserModel.belongsTo(model.User, { foreignKey: 'id', onDelete: 'CASCADE' });
        LectureUserModel.belongsTo(model.Lecture, { foreignKey: 'id', onDelete: 'CASCADE' });

    }
}
module.exports = LectureUserModel;

