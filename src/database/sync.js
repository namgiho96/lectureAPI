const db = require('./db');

const { models } = db;

const associate = () => {
  // console.log(models);
  Object.values(models).forEach(model => {
    // console.log(model);
    if (model.associate) {
      model.associate(models);
    }
  });
};
const sync = () => {
  associate();
  db.sync({ force: true });
};

module.exports = { associate, sync };
