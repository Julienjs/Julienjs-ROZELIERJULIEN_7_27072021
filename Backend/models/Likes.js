const { DataTypes } = require("sequelize");
const dataBase = require("./connection");

const Likes = dataBase.define("Likes",
    {

    });

module.exports = Likes;