
module.exports = (sequelize, DataTypes) => {
    const UserLecture = sequelize.define('UserLecture', {
        id: DataTypes.UUID,
        name: DataTypes.STRING,
        email: DataTypes.STRING
    }, {});
    UserLecture.associate = function(models) {
        UserLecture.belongsToMany(models.Lecture, { through: UserLecture });
    };
    return UserLecture;
};
