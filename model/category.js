module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return categories;
};
