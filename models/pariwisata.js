const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Data = require("./data");

const Pariwisata = sequelize.define(
  "Pariwisata",
  {
    alamatID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DataID: {
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

Pariwisata.belongsTo(Data, { foreignKey: 'DataID' });
Data.hasMany(Pariwisata, { foreignKey: 'DataID' });

module.exports = Pariwisata;
