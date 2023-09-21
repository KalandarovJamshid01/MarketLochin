module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define("products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    option: {
      type: DataTypes.STRING,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    measure: {
      type: DataTypes.ENUM("kg", "litr", "dona"),
    },
  });
  return products;
};
