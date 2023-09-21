module.exports = (sequelize, DataTypes) => {
  const sellers = sequelize.define("sellers", {
    sellerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sellerRole: {
      type: DataTypes.ENUM("admin", "seller"),
      defaultValue: "seller",
    },
  });
  return sellers;
};
