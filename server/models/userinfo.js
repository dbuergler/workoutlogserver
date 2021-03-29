const { DataTypes } = require("sequelize/types")

module.exports = function (sequelize, Datatypes) {
    return sequelize.define('userinfo', {
        dateOfBirth: {
            type: Datatypes.DATEONLY,
            allowNull: false,
            validate: {
                isBefore: "2005-01-01"
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 110
            }
        },
        heightInInches: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        goal: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    })
}