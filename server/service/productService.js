const { Product, Variation } = require('../models');

const addProduct = async (productData) => {
	try {
		if (Array.isArray(productData)) {
			for (const item of productData) {
				const product = await Product.create({
					name: item.name,
					brand: item.brand,
					model: item.model
				});
				if (item.data) {
					for (const variation of item.data) {
						await Variation.create({
							productId: product.productId,
							color: variation.color,
							price: variation.price
						});
					}
				}
			}
		} else {
			let productDetails = {};
			let variations = [];

			if (productData.details) {
				productDetails = {
					name: productData.name,
					brand: productData.details.brand,
					model: productData.details.model
				};
				variations.push({ color: productData.details.color, price: productData.price });
			} else {
				productDetails = {
					name: productData.name,
					brand: productData.brand,
					model: productData.model
				};
				variations.push({ color: productData.color, price: productData.price });
			}

			const product = await Product.create(productDetails);
			for (const variation of variations) {
				await Variation.create({
					productId: product.productId,
					color: variation.color,
					price: variation.price
				});
			}
		}
	} catch (error) {
		throw new Error('Error adding product with variations: ' + error.message);
	}
};

const getProducts = async () => {
	const products = await Product.findAll({
		include: [
			{
				model: Variation,
				as: 'Variations',
				attributes: [ 'color', 'price' ]
			}
		]
	});
	return products;
};

const getProductById = async (productId) => {
	try {
		const product = await Product.findByPk(productId, {
			include: [
				{
					model: Variation,
					as: 'Variations',
					attributes: [ 'color', 'price' ]
				}
			]
		});

		if (!product) {
			return null;
		}

		return product;
	} catch (error) {
		throw new Error(`Error fetching product by ID: ${error.message}`);
	}
};

const updateProduct = async (productId, productData) => {
	try {
		const product = await Product.findByPk(productId);
		if (!product) {
			throw new Error('Product not found');
		}

		let productDetails, variations;

		if (!Array.isArray(productData)) {
			productDetails = {
				name: productData.name,
				brand: productData.details ? productData.details.brand : productData.brand,
				model: productData.details ? productData.details.model : productData.model
			};
			variations = [
				{
					color: productData.details ? productData.details.color : productData.color,
					price: productData.price
				}
			];
		} else {
			const matchingProductData = productData.find((item) => item.name === product.name);
			if (!matchingProductData) {
				throw new Error('Matching product data not found in the array');
			}
			productDetails = {
				name: matchingProductData.name,
				brand: matchingProductData.brand,
				model: matchingProductData.model
			};
			variations = matchingProductData.data;
		}

		await product.update(productDetails);

		const existingVariations = await Variation.findAll({ where: { productId } });

		for (const existingVariation of existingVariations) {
			if (!variations.some((variation) => variation.color === existingVariation.color)) {
				await existingVariation.destroy();
			}
		}

		for (const variationData of variations) {
			const existingVariation = existingVariations.find((variation) => variation.color === variationData.color);
			if (existingVariation) {
				await existingVariation.update(variationData);
			} else {
				await Variation.create({ ...variationData, productId });
			}
		}

		return await Product.findByPk(productId, {
			include: [ { model: Variation, as: 'Variations' } ]
		});
	} catch (error) {
		throw new Error(`Error updating product and variations: ${error.message}`);
	}
};

const deleteProduct = async (productId) => {
	try {
		const product = await Product.findByPk(productId);
		if (!product) {
			throw new Error('Product not found');
		}

		await product.destroy();
		return { message: 'Product deleted successfully' };
	} catch (error) {
		throw new Error('Error deleting product: ' + error.message);
	}
};

module.exports = {
	addProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct
};
