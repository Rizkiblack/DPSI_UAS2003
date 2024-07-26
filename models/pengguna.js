const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Data = require("./data")
const Pengguna = sequelize.define(
  "Pengguna",
  {
    userID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DataID:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Data,
        key: "DataID", 
        },
    },
  },
  {
    timestamps: false,
  }
);
Pengguna.belongsTo(Pengguna, { foreignKey: 'DataID' });
Data.hasMany(Data, { foreignKey: 'PenggunaID' });
module.exports = Pengguna;