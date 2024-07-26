const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Admin = require("./admin");

const Data = sequelize.define(
  "Data",
  {
    DataID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    menambah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mengurangi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AdminID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: "AdminID"
      },
    },
  },
  {
    timestamps: false,
  }
);

// Definisikan relasi antara Data dan Admin
Data.belongsTo(Admin, { foreignKey: 'AdminID' });
Admin.hasMany(Data, { foreignKey: 'AdminID' });

module.exports = Data;
