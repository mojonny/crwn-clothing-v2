import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../../components/contexts/cart.context';
import CartItem from '../../components/cart-item/cart-item.component';

export default function Checkout() {
	const { cartItems } = useContext(CartContext);

	return (
		<div>
			<div> Product Description Quantity Price Remove</div>
			{/* Each cart item from the cart is laid out below*/}
			{/* Each item has an image, name, qty, price, remove icon */}
			{/* You can adjust the quantity up or down AND remove if needed */}
			<div className="cart-items">
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
		</div>
	);
}
