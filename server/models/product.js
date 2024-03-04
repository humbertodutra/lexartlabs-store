const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
			Product.hasMany(models.Variation, { foreignKey: 'productId' });
		}
	}

	Product.init(
		{
			productId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			brand: {
				type: DataTypes.STRING,
				allowNull: false
			},
			model: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'Product',
			tableName: 'products',
			timestamps: false
		}
	);

	return Product;
};
