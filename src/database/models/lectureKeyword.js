const { DataTypes } = require('sequelize');
const { BaseModel } = require('./base');
const model = require('./internal');

const lectureKeywordAttributes = {
    lectureId: { type: DataTypes.INTEGER, references: { model: model.Lecture, key: 'id' } },
    keywordId: { type: DataTypes.UUID, references: { model: model.Keyword, key: 'id' } }
};

class LectureKeywordModel extends BaseModel {
    static initModel(sequelize) {
        LectureKeywordModel.sequelize = sequelize;
        LectureKeywordModel.init(lectureKeywordAttributes, {
            sequelize,
            modelName: 'LectureKeyword',
            indexes: [{
                fields:['lectureId'],
            },{
                fields:['keywordId'],
            }]});
    }

    static relationModel() {
        LectureKeywordModel.belongsTo(model.Lecture, { foreignKey: 'lectureId', onDelete: 'CASCADE' });

    }
}

module.exports = LectureKeywordModel;