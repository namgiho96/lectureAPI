const { DataTypes } = require('sequelize');
const { BaseModel } = require('./base');
const model = require('../models');

class KeywordModel extends BaseModel {
    static initModel(sequelize) {
        KeywordModel.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            useage_count: {
                type: DataTypes.STRING,
                defaultValue: ''
            }
        }, {
            sequelize,
            modelName: 'Keyword'
        });
    }

    static relationModel() {
        KeywordModel.belongsToMany(model.Lecture, { through: model.LectureKeyword, foreignKey: 'keywordId' });
    }



}

module.exports = KeywordModel;