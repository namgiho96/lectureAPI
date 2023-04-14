
module.exports = (sequelize, DataTypes) => {
    const LectureKeyWord = sequelize.define('LectureKeyWord', {
        id: DataTypes.UUID,
        name: DataTypes.STRING,
        email: DataTypes.STRING
    }, {});

    return LectureKeyWord;
};
