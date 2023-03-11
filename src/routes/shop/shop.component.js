import { useContext } from 'react';
import { ProductsContext } from '../../components/contexts/products.context';
import './shop.styles.css';

import ProductCard from '../../components/product-card/product-card.component';

export default function Shop() {
	const { products } = useContext(ProductsContext);

	return (
		<div className="products-container">
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</div>
	);
}
