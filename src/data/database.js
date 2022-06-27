const { Sequelize,DataTypes } = require('sequelize');

const dialect = process.env.DIALECT;
const host = process.env.HOST;
//const username = process.env.USERNAME || 
const username = 'postgres';
const password = process.env.PASSWORD;
const port = process.env.DB_PORT;
const database = process.env.DATABASE;

const dbConnect = new Sequelize({
    dialect,
    host,
    username,
    password,
    port,
    database,
    logging: false
});

const connectDB = ()=>{
    dbConnect.authenticate()
        .then(()=>console.log('db authenticated'))
        .catch(err=>console.log(err))

    //models
    const { Users } = require('../models/users');
    const { Tasks } = require('../models/tasks');

    //models relations
    Users.hasMany(Tasks,{ foreignKey:'userId' });
    Tasks.belongsTo(Users);
    
    dbConnect.sync()
        .then(()=>console.log('db synced'))
        .catch(err=>console.log(err))
}

module.exports = {
    dbConnect,
    connectDB
};