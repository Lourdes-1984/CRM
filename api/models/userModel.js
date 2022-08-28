const {Sequelize,DataTypes} = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;