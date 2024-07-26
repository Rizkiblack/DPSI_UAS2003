const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Data = require("./data")
const Rumah_adat = sequelize.define(
  "Rumah_adat",
  {
    adatID: {
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
Rumah_adat.belongsTo(Rumah_adat, { foreignKey: 'DataID' });
Data.hasMany(Data, { foreignKey: 'Rumah_adatID' });
module.exports = Rumah_adat;