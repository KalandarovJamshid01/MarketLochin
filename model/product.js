module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define("products", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    productQuantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    productOption: {
      type: DataTypes.STRING,
    },
    productImgUrl: {
      type: DataTypes.STRING,
    },
    productMeasure: {
      type: DataTypes.ENUM("kg", "litr", "dona"),
    },
  });
  return products;
};
