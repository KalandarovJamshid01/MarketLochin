module.exports = (sequelize, DataTypes) => {
  const sellers = sequelize.define("sellers", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "seller"),
      defaultValue: "seller",
    },
  });
  return sellers;
};
