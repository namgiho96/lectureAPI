'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LectureUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lectureId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
      },
      viewed: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LectureUsers');
  }
};