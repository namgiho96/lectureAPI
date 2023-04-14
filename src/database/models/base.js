'use strict';

const { Model } = require('sequelize');
// const uuidv4 = require('uuid').v4;
const model = require('../models');


class BaseModel extends Model {
    constructor(...args) {
        super(...args);
    }
    static initModel(attributes, options) {
        Model.init(attributes, options)
    }
}

exports.BaseModel = BaseModel;