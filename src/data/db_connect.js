const Sequelize = require('sequelize');

const dbconn = new Sequelize('db_pm', 'root', 'root', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: ':memory:'
  //'path/to/database.sqlite'
});

const pmModel = dbconn.define('pmTab',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id"
    },
    idUser:{
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_id"
    },
    idDestUser:{
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "dest_id"
    },
    createdAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: "date_time"
    },
    msgContent:{
        type: Sequelize.TEXT,
        allowNull: false,
        field: "msg_content"
    }
});
pmModel.sync();
module.exports = dbconn;
// Or you can simply use a connection uri
//const sequelize = new Sequelize('postgres://root:root@example.com:5432/db_pm');