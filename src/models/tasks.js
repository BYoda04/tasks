const { dbConnect } = require('../data/database');
const { DataTypes } = require('sequelize');

//Model table
const Tasks = dbConnect.define('tasks', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    limitDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finishDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'actived',
    }
});

module.exports = {
    Tasks
};