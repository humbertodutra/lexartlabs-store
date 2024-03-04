const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Variation extends Model {
		static associate(models) {
			Variation.belongsTo(models.Product, { foreignKey: 'productId' });
		}
	}

	Variation.init(
		{
			variationId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			productId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Product',
					key: 'productId'
				}
			},
			color: {
				type: DataTypes.STRING,
				allowNull: false
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'Variation',
			tableName: 'variations',
			timestamps: false // Desativa os timestamps se você não estiver usando campos como `createdAt` e `updatedAt`
		}
	);

	return Variation;
};
