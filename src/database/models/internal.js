const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.userName, config.password,{dialect: 'postgres'},);
console.log("Connected Postgre Connection");
initSequelizeErrorHandling();
const { DatabaseError } = require('../../module/error');


let instance = null;

class ModelManager {
    constructor() {
        this.sequelize = sequelize;
        this.Sequelize = Sequelize;
    }
    getModelFileList() {
        return [
            'user.js',
        ];
    }

    async syncAllDB() {
        try {
            const fileNameList = this.getModelFileList();
            const db = {};
            const modelOptions = process.env.NODE_ENV === 'product' ? {alter: true} : {alter: true};
            for(const fileName of fileNameList) {
                const model = require('./user.js');
                model.initModel(sequelize);
                await model.sync(modelOptions);
                db[model.name] = model;
            }
            for(const modelName in db) {
                if(db[modelName].relationModel && typeof db[modelName].relationModel == 'function') {
                    db[modelName].relationModel();
                }
            }
            console.log("Complete Postgre Connection Sync");
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    disconnectDB() {
        this.sequelize.close().catch(err => {console.log(err)});
    }

    get User () {
        return require('./user');
    }
    get Lecture() {
        return require('./lecture');
    }

    static getInstance() {
        if(instance == null) {
            instance = new ModelManager();
        }
        return instance;
    }
}

function initSequelizeErrorHandling () {
    const SequelizeModel = require('sequelize/lib/model');
    const orgFindAll = SequelizeModel.findAll;
    SequelizeModel.findAll = function() {
        return orgFindAll.apply(this, arguments).catch(err => {
            if(err instanceof DatabaseError) {
                throw err;
            }
            throw new DatabaseError(err.parent);
        })
    };

    const orgCreate = SequelizeModel.create;
    SequelizeModel.create = function() {
        return orgCreate.apply(this, arguments).catch(err => {
            if(err instanceof DatabaseError) {
                throw err;
            }
            throw new DatabaseError(err.parent);
        })
    };

    sequelize.query = function() {
        return this.Sequelize.prototype.query.apply(this, arguments).catch(err => {
            if(err instanceof DatabaseError) {
                throw err;
            }
            throw new DatabaseError(err.parent);
        })
    };
}
module.exports = ModelManager.getInstance();