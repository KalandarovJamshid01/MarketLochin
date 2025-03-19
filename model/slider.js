module.exports = (sequelize, DataTypes) => {
  const sliders = sequelize.define('sliders', {
    slideName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slideImgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slideOrder: {
      type: DataTypes.ENUM('1', '2', '3'),
    },
  });
  return sliders;
};
