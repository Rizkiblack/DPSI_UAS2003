const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Data = require("./data")
const Makanan = sequelize.define(
  "Makanan",
  {
    makananID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
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
 // Definisikan relasi antara Product dan Category
 Makanan.belongsTo(Makanan, { foreignKey: 'DataID' });
 Data.hasMany(Data, { foreignKey: 'MakananID' });
module.exports = Makanan;