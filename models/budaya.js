const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Data = require("./data");

const Budaya = sequelize.define(
  "Budaya",
  {
    BudayaID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DataID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Data,
        key: "DataID"
      },
    },
  },
  {
    timestamps: false,
  }
);

// Definisikan relasi antara Budaya dan Data
Budaya.belongsTo(Data, { foreignKey: 'DataID' });
Data.hasMany(Budaya, { foreignKey: 'DataID' });

module.exports = Budaya;
