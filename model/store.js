module.exports = (sequelize, DataTypes) => {
  const stores = sequelize.define("stores", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return stores;
};
