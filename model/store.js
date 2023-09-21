module.exports = (sequelize, DataTypes) => {
  const stores = sequelize.define("stores", {
    storeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return stores;
};
